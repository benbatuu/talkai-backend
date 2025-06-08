// helpers/gemini.ts dosyasından gelenler (önceki yanıtı referans alın)
import { GoogleGenerativeAI, ChatSession } from '@google/generative-ai';
import { env } from 'bun';

export interface GeminiMessage {
    role: 'user' | 'model';
    parts: { text: string }[];
}

export interface TeacherFeedback {
    // correctedText ve errors öğrenilen dilde (learningLanguage) olacaktır
    correctedText?: string;
    errors?: {
        type: 'grammar' | 'spelling' | 'vocabulary' | 'pronunciation' | 'syntax';
        original: string;
        correction: string;
        explanation: string; // Bu açıklama appLanguage'de olmalı
        suggestion?: string; // Bu öneri appLanguage'de olmalı
    }[];
    // Aşağıdaki alanlar kullanıcının uygulama dilinde (appLanguage) olacaktır
    generalComment: string;         // Kullanıcının genel performansına dair appLanguage'de yorum
    nextExerciseSuggestion?: string; // AppLanguage'de bir sonraki pratik için öneri
    rawTextResponse?: string;       // JSON ayrıştırma başarısız olursa ham metin yanıtı
    // Yeni ekleyebileceğiniz alan:
    // Örneğin, belirli bir konuya odaklanmasını sağlamak için
    focusedTopicSuggestion?: string; // learningLanguage dilinde odaklanması istenen konu/cümle
}

class GeminiService {
    private genAI: GoogleGenerativeAI;
    private readonly DEFAULT_MODEL: string = 'gemini-1.5-flash';

    constructor() {
        if (!env.GEMINI_API_KEY) {
            throw new Error("GEMINI_API_KEY environment variable is not set.");
        }
        this.genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);
    }

    async startNewChat(
        systemInstruction: string,
        model: string = this.DEFAULT_MODEL,
        temperature: number = 0.7
    ): Promise<ChatSession> {
        try {
            const modelInstance = this.genAI.getGenerativeModel({ model });
            const chat = modelInstance.startChat({
                history: [],
                generationConfig: {
                    temperature,
                    responseMimeType: "application/json" // Çıktıyı JSON olarak zorlamaya çalış
                },
                systemInstruction: {
                    role: 'user',
                    parts: [{ text: systemInstruction }]
                }
            });
            return chat;
        } catch (error) {
            console.error("Gemini API startNewChat error:", error);
            throw new Error(`Gemini'dan sohbet başlatılamadı: ${error instanceof Error ? error.message : 'Bilinmeyen hata'}`);
        }
    }

    async sendMessageToChat(
        chat: ChatSession,
        message: string
    ): Promise<string> {
        try {
            const result = await chat.sendMessage(message);
            const response = await result.response;
            return response.text();
        } catch (error) {
            console.error("Gemini API sendMessageToChat error:", error);
            throw new Error(`Gemini'dan yanıt alınamadı: ${error instanceof Error ? error.message : 'Bilinmeyen hata'}`);
        }
    }
    // generateChatResponse metodu aynı kalabilir veya kaldırılabilir (deprecated olarak işaretlendiği için)
}

const geminiService = new GeminiService();
export default geminiService;