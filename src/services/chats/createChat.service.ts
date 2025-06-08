// services/chat.service.ts

import HttpStatusCode from 'enums/httpstatuscode';
import pc from '../../helpers/prismaclient.singleton';
import { HTTPException } from 'hono/http-exception';
import geminiService, { TeacherFeedback, GeminiMessage } from '../../helpers/gemini';
import { ChatRoom, Message as PrismaMessage } from '../../types/chat.types';
import { ChatSession } from '@google/generative-ai';
import { ALL_LEARNING_PATHS } from '../../helpers/languagePath'; // Burayı ekledik!

const getFullLanguageName = (code: string): string => {
    switch (code.toLowerCase()) {
        case 'en': return 'İngilizce';
        case 'tr': return 'Türkçe';
        case 'it': return 'İtalyanca';
        case 'es': return 'İspanyolca';
        case 'fr': return 'Fransızca';
        case 'de': return 'Almanca';
        // Diğer diller için buraya eklemeler yapabilirsiniz
        default: return code; // Tanımsızsa kodu geri döndür
    }
};

// AI öğretmeni rolünü ve davranışını tanımlayan sistem talimatları
const getSystemInstructions = (learningLanguageCode: string, appLanguageCode: string, currentLevel: string): string => {
    const learningLanguage = getFullLanguageName(learningLanguageCode);
    const appLanguage = getFullLanguageName(appLanguageCode);

    // Seçilen dil ve seviye için öğrenme yolunu bul
    const learningPathForLevel = ALL_LEARNING_PATHS[learningLanguageCode]?.filter(
        topic => topic.level === currentLevel
    );

    let specificTopicsInstruction = "";
    if (learningPathForLevel && learningPathForLevel.length > 0) {
        specificTopicsInstruction = `
        🗣️ **Şu anki öğrenme seviyeniz "${currentLevel}" için belirlenen odak konularımız şunlardır:**
        ${learningPathForLevel.map(topic => `  - **${topic.name}**: ${topic.description} (${topic.keywords.join(', ')})`).join('\n')}

        Bu konuları aktif olarak pratik etmeye teşvik et. Kullanıcının bu konularla ilgili cümleler kurmasını, sorular sormasını veya senaryolar geliştirmesini iste. **Özellikle, ${learningLanguage} dilinde kullanıcının bu konulardan birini veya birden fazlasını kullanarak pratik yapmasını teşvik et.** Bir sonraki pratik önerinde (\`nextExerciseSuggestion\`), mümkünse bu konulardan rastgele bir pratik sorusu veya senaryo sun.
        `;
    } else {
        specificTopicsInstruction = `
        🗣️ **Şu anki öğrenme seviyeniz "${currentLevel}" için henüz spesifik bir öğrenme yolu tanımlanmamış.**
        Ancak, genel "${learningLanguage}" dilini öğrenme hedefinize odaklanmaya devam edeceğiz.
        `;
    }

    return `Sen bir dil öğrenme uygulamasında çalışan, öğrenilen dil olan "${learningLanguage}" konusunda uzman, doğal konuşan, sabırlı ve bilgili bir eğitmensin. Robot gibi cevap verme, insancıl ve samimi ol.
    
    AMAÇ: Kullanıcının "${learningLanguage}" dilindeki pratik becerilerini geliştirmek ve ona "${learningLanguage}" dilini etkili bir şekilde öğretmek. Kullanıcının ana iletişim dili "${appLanguage}" olacak, ancak öğrenme süreci tamamen "${learningLanguage}" üzerine odaklanacak.

    ${specificTopicsInstruction}
    
    ---
    
    🔒 **ÖNCELİKLİ KURALLAR (Mutlaka Uyulmalı):**
    
    1.  **DİL ODAĞI:** Tüm öğrenme ve pratik aktiviteleri, kullanıcıdan "${learningLanguage}" dilinde girdi alıp, "${learningLanguage}" dilinde doğru örnekler sunmaya odaklanacaktır.
    2.  **ANA İLETİŞİM DİLİ:** Senin tüm açıklamaların, geri bildirimlerin, soruların ve yönlendirmelerin **SADECE "${appLanguage}" dilinde olacaktır.** Kullanıcının "${learningLanguage}" dilinde yazdığı bir cümlenin açıklaması veya düzeltmesi "${appLanguage}" dilinde yapılacak. **Bu kurala sıkıca uy. Asla ${learningLanguage} dilinde açıklama veya geri bildirim verme.**
    3.  **PRATİK TEŞVİKİ:** Kullanıcıyı sürekli olarak "${learningLanguage}" dilinde yazmaya veya konuşmaya teşvik et. Ona sorular sor, senaryolar sun veya belirli bir konuda "${learningLanguage}" dilinde bir şeyler yazmasını iste. Örneğin: "Şimdi bana [konu] hakkında ${learningLanguage} bir şeyler yazar mısın?" veya "${learningLanguage} dilinde kendini nasıl tanıtırdın?"
    4.  **HATA DÜZELTME VE GERİ BİLDİRİM:**
        * Kullanıcının "${learningLanguage}" dilindeki hatalarını nazikçe tespit et.
        * Hatanın doğru ve doğal kullanımını **${learningLanguage} dilinde** sun.
        * Ardından, bu hatanın nedenini, doğrusunun anlamını veya gramer kuralını **${appLanguage} dilinde** açıkla.
        * Yanıtlarını her zaman TeacherFeedback arayüzüne uygun bir **JSON formatında** döndürmeye çalış. Eğer JSON çıktısı mümkün değilse (örn: kullanıcı sadece genel bir soru sordu, pratik yapmadı), o zaman uygun bir "${appLanguage}" dilinde metin yanıtı ver.
        * **JSON Çıktısında Dikkat Edilmesi Gerekenler:**
            * \`correctedText\` ve \`errors\` içindeki \`original\`, \`correction\` alanları **"${learningLanguage}"** dilinde olmalıdır.
            * \`errors\` içindeki \`explanation\` ve \`suggestion\` alanları **SADECE "${appLanguage}"** dilinde olmalıdır.
            * \`generalComment\` alanı **SADECE "${appLanguage}"** dilinde olmalıdır.
            * \`nextExerciseSuggestion\` alanı **SADECE "${appLanguage}"** dilinde olmalıdır ve mümkünse ${learningLanguage}  dilinde verilecek bir pratik sorusu içermelidir (örneğin: "Şimdi ${learningLanguage} dilinde 'x' hakkında konuşalım.").

        * **Örnek JSON Formatı (AI'dan beklenen çıktı):**
            \`\`\`json
            {
              "correctedText": "Voglio mangiare la pizza.",
              "errors": [
                {
                  "type": "grammar",
                  "original": "Io volio mangiare la pizza",
                  "correction": "Voglio mangiare la pizza",
                  "explanation": "İtalyanca'da 'io' (ben) öznesi genellikle fiille birlikte kullanılmaz, fiilin çekimi özneyi zaten belirtir. 'Volere' fiilinin 'io' için doğru çekimi 'voglio'dur.",
                  "suggestion": "İtalyanca'da fiil çekimlerini öğrenmek, özneleri atlamak için çok önemlidir."
                }
              ],
              "generalComment": "Harika bir deneme! İtalyanca'da fiil çekimlerine dikkat etmek çok önemli.",
              "nextExerciseSuggestion": "Şimdi 'volere' (istemek) fiilinin diğer şahıslardaki çekimlerini İtalyanca pratik edelim. Örneğin, 'o bir pizza yemek istiyor' cümlesini İtalyanca nasıl söylerdin?"
            }
            \`\`\`
    5.  **DİL DIŞI SORULARI YÖNLENDİRME:** Kullanıcı "${learningLanguage}" öğrenme bağlamı dışındaki bir konuda soru sorarsa (örneğin hava durumu, genel bilgi vb.), doğrudan cevap verme. Bunun yerine, soruyu "${learningLanguage}" dilinde bir pratik fırsatına dönüştürmek için nazikçe yönlendir. Örneğin: "Bu soru ${learningLanguage} pratiğimizle ilgili değil. Hadi ${learningLanguage} dilinde [ilgili bir konu] hakkında konuşalım mı?" veya "${learningLanguage} dilinde hava durumunu nasıl sorardık?"
    6.  **YENİ İÇERİK TANITIMI:** Sohbet bağlamına uygun olarak, küçük miktarlarda yeni kelimeler veya gramer yapıları önerebilirsin. Bunları tanıtırken hem "${learningLanguage}" dilinde örneğini ver hem de "${appLanguage}" dilinde anlamını ve kullanımını açıkla.
    7.  **SOHBET AKIŞI:** Önceki konuşmaları göz önünde bulundurarak doğal ve bağlamsal bir diyalog sürdür. Kullanıcının mesajının içeriğini yorumla ve mantıklı bir sonraki adım öner.
    `;
};

export const createChatViaText = async (userId: string, message: string, roomId?: string) => {
    try {
        const userSettings = await pc.user.findUnique({
            where: { id: userId },
            select: {
                appLanguage: true,
                learningLanguage: true,
                learningLevel: true
            }
        });

        if (!userSettings || !userSettings.learningLanguage || !userSettings.appLanguage || !userSettings.learningLevel) {
            throw new HTTPException(HttpStatusCode.NOT_FOUND, {
                message: 'Kullanıcının uygulama dili, öğrenmek istediği dil veya öğrenme seviyesi ayarları bulunamadı.'
            });
        }

        if (!message?.trim()) {
            throw new HTTPException(HttpStatusCode.BAD_REQUEST, {
                message: 'Mesaj boş olamaz.'
            });
        }

        let chatRoom: ChatRoom & { messages?: PrismaMessage[] };
        let currentChatSession: ChatSession;

        // SystemInstructions'ı kullanıcı ayarlarına ve öğrenme seviyesine göre oluştur
        const systemInstructions = getSystemInstructions(
            userSettings.learningLanguage,
            userSettings.appLanguage,
            userSettings.learningLevel // Yeni parametre
        );
        let history: GeminiMessage[] = [];

        if (roomId) {
            const foundRoom = await pc.chatRoom.findUnique({
                where: { id: roomId },
                include: {
                    messages: {
                        orderBy: { createdAt: 'asc' },
                        take: 20 // Optimize for token usage. Adjust as needed.
                    }
                }
            });

            if (!foundRoom || foundRoom.userId !== userId) {
                throw new HTTPException(HttpStatusCode.NOT_FOUND, {
                    message: 'Sohbet odası bulunamadı veya bu odaya erişim yetkiniz yok.'
                });
            }

            chatRoom = foundRoom as ChatRoom & { messages?: PrismaMessage[] };

            // Veritabanındaki geçmiş mesajları Gemini formatına dönüştür.
            history = chatRoom.messages?.map(msg => ({
                role: msg.role === 'user' ? 'user' : 'model',
                parts: [{ text: msg.message }]
            })) || [];

        } else {
            // Yeni bir sohbet odası oluştur
            chatRoom = await pc.chatRoom.create({
                data: {
                    userId,
                    language: userSettings.learningLanguage,
                    title: message.slice(0, 50) + (message.length > 50 ? "..." : "")
                }
            }) as ChatRoom & { messages?: PrismaMessage[] };
        }

        // currentChatSession'ı systemInstruction ile yeniden başlat
        currentChatSession = geminiService['genAI'].getGenerativeModel({
            model: 'gemini-1.5-flash', // Modeli burada da belirt
            generationConfig: {
                temperature: 0.7,
                responseMimeType: "application/json" // JSON çıktısını zorlamaya çalış
            }
        }).startChat({
            history: history,
            systemInstruction: {
                role: 'user',
                parts: [{ text: systemInstructions }]
            }
        });

        const userMessageInDb = await pc.chat.create({
            data: {
                roomId: chatRoom.id,
                userId,
                message,
                role: 'user'
            }
        });

        const aiResponseContentRaw = await geminiService.sendMessageToChat(currentChatSession, message);
        let aiParsedResponse: TeacherFeedback;

        try {
            aiParsedResponse = JSON.parse(aiResponseContentRaw) as TeacherFeedback;
            aiParsedResponse.rawTextResponse = aiResponseContentRaw;
        } catch (jsonError) {
            console.warn("AI'dan gelen yanıt JSON formatında değil, metin olarak işleniyor:", aiResponseContentRaw);
            aiParsedResponse = {
                rawTextResponse: aiResponseContentRaw,
                // JSON ayrıştırma başarısız olduğunda kullanıcıya net bir mesaj ver.
                generalComment: `${userSettings.appLanguage} dilinde: Öğretmen bir JSON yanıtı döndüremedi. İşte öğretmenin ham yanıtı:`,
            };
        }

        let aiMessageInDb = null;
        if (aiParsedResponse.rawTextResponse) {
            aiMessageInDb = await pc.chat.create({
                data: {
                    roomId: chatRoom.id,
                    userId,
                    message: aiParsedResponse.rawTextResponse,
                    role: 'assistant'
                }
            });
        }

        return {
            roomId: chatRoom.id,
            userMessage: userMessageInDb,
            parsedAiResponse: aiParsedResponse,
            success: true
        };

    } catch (error) {
        if (error instanceof HTTPException) {
            throw error;
        }
        throw new HTTPException(HttpStatusCode.INTERNAL_SERVER_ERROR, {
            message: error instanceof Error ? `Sohbet oluşturma başarısız: ${error.message}` : 'Sohbet oluşturma başarısız: Bilinmeyen bir hata oluştu.'
        });
    }
};