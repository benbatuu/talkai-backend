// languagePath.ts

// Öğrenme yolu konusunu tanımlayan arayüz
interface LevelTopic {
    level: string;          // Örneğin: "A1.1", "A1.2", "B1.1"
    name: string;           // Konunun adı (örn: "Temel Selamlaşmalar")
    description: string;    // Konunun kısa açıklaması
    keywords: string[];     // Konuyla ilgili anahtar kelimeler/gramer yapıları
    practicePrompts: string[]; // Bu konuda AI'ın kullanıcıya sorabileceği örnek sorular
}

// Tüm diller için öğrenme yollarını içeren ana obje
export const ALL_LEARNING_PATHS: { [language: string]: LevelTopic[] } = {
    "en": [
        // --- A1.1 Level ---
        {
            level: "A1.1",
            name: "Basic Greetings and Introductions",
            description: "Introducing yourself, greeting others, and exchanging simple personal information.",
            keywords: ["hello", "hi", "good morning", "good evening", "good night", "my name is", "nice to meet you", "I am", "you are", "how are you"],
            practicePrompts: [
                "How would you introduce yourself in English?",
                "How do you say 'Hello, how are you?' in English?",
                "Ask someone's name in English when you first meet them.",
                "Write a short dialogue where you greet someone and introduce yourself."
            ]
        },
        {
            level: "A1.1",
            name: "Numbers (0-20) and Phone Numbers",
            description: "Saying and understanding numbers from 0 to 20, and communicating phone numbers.",
            keywords: ["one", "two", "three", "twenty", "zero", "phone number", "what's your phone number"],
            practicePrompts: [
                "Count from 1 to 10 in English.",
                "What is your phone number? (You can make one up!)",
                "How do you say 'fifteen' in English?",
                "Write a sentence using the number 'seven'."
            ]
        },
        {
            level: "A1.1",
            name: "Days, Months, and Seasons",
            description: "Talking about days of the week, months of the year, and seasons.",
            keywords: ["Monday", "Tuesday", "January", "February", "spring", "summer", "today", "tomorrow", "yesterday"],
            practicePrompts: [
                "List the days of the week in English.",
                "What's your favorite month and why?",
                "What season is it now? Describe it in English.",
                "How do you say 'Wednesday' in English?"
            ]
        },
        // --- A1.2 Level ---
        {
            level: "A1.2",
            name: "Family Members and Descriptions",
            description: "Introducing and describing family members using basic adjectives.",
            keywords: ["mother", "father", "brother", "sister", "family", "parents", "children", "old", "young", "tall", "short"],
            practicePrompts: [
                "Describe your family in English (2-3 sentences).",
                "How do you say 'grandmother' in English?",
                "Who is your favorite family member and why? (in English)",
                "Write a sentence about your brother or sister, describing them."
            ]
        },
        {
            level: "A1.2",
            name: "Colors and Basic Adjectives",
            description: "Identifying and describing colors, and using simple adjectives for objects.",
            keywords: ["red", "blue", "green", "big", "small", "good", "bad", "new", "old", "beautiful"],
            practicePrompts: [
                "What are your three favorite colors in English?",
                "Describe your room using three adjectives in English.",
                "How do you say 'purple' in English?",
                "Write a sentence using 'happy' and describing an object."
            ]
        },
        {
            level: "A1.2",
            name: "Daily Routines (Present Simple)",
            description: "Talking about everyday activities and habits using the present simple tense.",
            keywords: ["I wake up", "I eat breakfast", "I go to work/school", "I sleep", "every day", "usually", "always"],
            practicePrompts: [
                "Describe your typical morning routine in English.",
                "What do you usually do on weekends?",
                "Write three sentences about what you do every evening.",
                "How do you ask someone about their daily routine?"
            ]
        },
        // --- A2.1 Level ---
        {
            level: "A2.1",
            name: "Past Simple (Regular and Irregular Verbs)",
            description: "Talking about past events and experiences.",
            keywords: ["was", "were", "did", "went", "ate", "slept", "yesterday", "last week", "last year"],
            practicePrompts: [
                "Describe what you did yesterday (3-4 sentences).",
                "What did you eat for dinner last night?",
                "Tell me about your last holiday.",
                "Write about a fun activity you did last weekend."
            ]
        },
        {
            level: "A2.1",
            name: "Future with 'Going to' and 'Will'",
            description: "Expressing future plans and predictions.",
            keywords: ["I am going to", "he is going to", "I will", "it will rain", "next week", "tomorrow"],
            practicePrompts: [
                "What are your plans for next weekend?",
                "What do you think will happen in the future?",
                "Write three sentences about what you are going to do tomorrow.",
                "Ask a friend about their future plans."
            ]
        },
        {
            level: "A2.1",
            name: "Comparatives and Superlatives",
            description: "Comparing people, places, and things.",
            keywords: ["bigger", "smaller", "more beautiful", "the biggest", "the most interesting", "taller than", "as ... as"],
            practicePrompts: [
                "Compare two cities you know using comparatives.",
                "Describe the most beautiful place you've ever visited.",
                "Compare two animals using English adjectives.",
                "Write a sentence comparing two friends using 'taller than'."
            ]
        },
        // --- A2.2 Level ---
        {
            level: "A2.2",
            name: "Present Perfect Simple (Experiences)",
            description: "Talking about past experiences and events that have a connection to the present.",
            keywords: ["I have seen", "have you ever been", "I have never tried", "already", "yet", "for", "since"],
            practicePrompts: [
                "Have you ever traveled to another country? Describe it.",
                "What's one thing you have never tried but want to?",
                "Write three sentences about experiences you have had.",
                "Ask a friend about their past experiences using present perfect."
            ]
        },
        {
            level: "A2.2",
            name: "Prepositions of Place and Movement",
            description: "Describing locations and directions.",
            keywords: ["in", "on", "under", "next to", "between", "behind", "in front of", "to", "from", "into", "out of"],
            practicePrompts: [
                "Describe your living room using at least five prepositions of place.",
                "Give directions from your home to a nearby shop.",
                "Where is your phone right now? Use a preposition.",
                "Write a sentence about moving from one place to another."
            ]
        },
        {
            level: "A2.2",
            name: "Conditionals Type 1 (If... then...)",
            description: "Talking about real possibilities and their results.",
            keywords: ["if", "when", "then", "will", "might", "can"],
            practicePrompts: [
                "What will you do if it rains tomorrow?",
                "If you have free time this weekend, what will you do?",
                "Write three sentences about what might happen if you study hard.",
                "Complete the sentence: 'If I feel tired, I will...'"
            ]
        },
        // --- B1.1 Level ---
        {
            level: "B1.1",
            name: "Past Continuous and Past Simple",
            description: "Describing actions in progress in the past and interrupted actions.",
            keywords: ["was doing", "were watching", "while", "when", "suddenly", "at the same time"],
            practicePrompts: [
                "What were you doing at 8 PM yesterday when your phone rang?",
                "Describe a situation where you were doing something when something else happened.",
                "Write three sentences using both past continuous and past simple.",
                "Tell a short story using these tenses."
            ]
        },
        {
            level: "B1.1",
            name: "Present Perfect Continuous",
            description: "Talking about actions that started in the past and are still continuing or have just stopped.",
            keywords: ["have been doing", "since", "for", "all day", "recently"],
            practicePrompts: [
                "What have you been doing recently to learn English?",
                "How long have you been studying English?",
                "Describe something you have been doing for a long time.",
                "Write a sentence about an activity you've been doing all day."
            ]
        },
        {
            level: "B1.1",
            name: "Reporting Verbs (Say, Tell, Ask)",
            description: "Reporting what others have said or asked.",
            keywords: ["he said that", "she told me to", "they asked if", "reported speech"],
            practicePrompts: [
                "Report what your friend told you yesterday about their plans.",
                "Imagine you are a journalist. Report what someone said about a recent event.",
                "Transform a direct question into reported speech.",
                "Write a sentence using 'he told me that...'."
            ]
        },
    ],
    "tr": [
        // --- A1.1 Seviyesi ---
        {
            level: "A1.1",
            name: "Temel Selamlaşma ve Tanışma",
            description: "Kendini tanıtma, başkalarını selamlama ve basit kişisel bilgi alışverişi.",
            keywords: ["merhaba", "günaydın", "iyi akşamlar", "iyi geceler", "adım", "memnun oldum", "ben", "sen", "nasılsın"],
            practicePrompts: [
                "Kendini Türkçe'de nasıl tanıtırsın?",
                "Türkçe'de birine 'Merhaba, nasılsın?' nasıl dersin?",
                "Yeni tanıştığın birine adını nasıl sorarsın?",
                "Kısa bir diyalog yaz: birini selamla ve kendini tanıt."
            ]
        },
        {
            level: "A1.1",
            name: "Sayılar (0-20) ve Telefon Numaraları",
            description: "0'dan 20'ye kadar sayılar, telefon numaralarını söyleme ve anlama.",
            keywords: ["bir", "iki", "üç", "yirmi", "sıfır", "telefon numarası", "telefon numaran kaç"],
            practicePrompts: [
                "Türkçe'de 1'den 10'a kadar sayabilir misin?",
                "Telefon numaranı Türkçe olarak yazar mısın? (Rastgele bir numara olabilir)",
                "Türkçe'de 'on beş' ne anlama gelir?",
                "Bir cümle içinde 'yedi' sayısını kullan."
            ]
        },
        {
            level: "A1.1",
            name: "Günler, Aylar ve Mevsimler",
            description: "Haftanın günleri, aylar ve mevsimler hakkında konuşma.",
            keywords: ["pazartesi", "salı", "ocak", "şubat", "ilkbahar", "yaz", "bugün", "yarın", "dün"],
            practicePrompts: [
                "Haftanın günlerini Türkçe olarak listeler misin?",
                "En sevdiğin ay hangisi ve neden? (Türkçe)",
                "Şu an hangi mevsimdeyiz? Türkçe olarak açıkla.",
                "Türkçe'de 'çarşamba' nasıl yazılır?"
            ]
        },
        // --- A1.2 Seviyesi ---
        {
            level: "A1.2",
            name: "Aile Üyeleri ve Tanımlamalar",
            description: "Aile üyelerini tanıtma ve basit sıfatlarla tanımlama.",
            keywords: ["anne", "baba", "kardeş", "abla", "abi", "aile", "yaşlı", "genç", "uzun", "kısa"],
            practicePrompts: [
                "Aileni Türkçe olarak tanıt (2-3 cümle).",
                "Türkçe'de 'büyükanne' nasıl denir?",
                "Ailenizdeki en sevdiğiniz kişi kim ve neden? (Türkçe)",
                "Kız veya erkek kardeşin hakkında bir cümle yaz, onları tanımlayarak."
            ]
        },
        {
            level: "A1.2",
            name: "Renkler ve Temel Sıfatlar",
            description: "Renkleri tanımlama ve nesneler için basit sıfatları kullanma.",
            keywords: ["kırmızı", "mavi", "yeşil", "büyük", "küçük", "iyi", "kötü", "yeni", "eski", "güzel"],
            practicePrompts: [
                "En sevdiğin üç rengi Türkçe'de yazar mısın?",
                "Odanı üç sıfat kullanarak Türkçe'de tarif et.",
                "Türkçe'de 'mor' ne anlama gelir?",
                "Bir cümle içinde 'mutlu' kelimesini ve bir nesneyi kullanarak yaz."
            ]
        },
        {
            level: "A1.2",
            name: "Günlük Rutinler (Geniş Zaman)",
            description: "Günlük aktiviteler ve alışkanlıklar hakkında geniş zamanı kullanarak konuşma.",
            keywords: ["kalkarım", "kahvaltı ederim", "işe/okula giderim", "uyurum", "her gün", "genellikle", "her zaman"],
            practicePrompts: [
                "Tipik bir sabah rutinini Türkçe olarak açıkla.",
                "Hafta sonları genellikle ne yaparsın?",
                "Her akşam ne yaptığın hakkında üç cümle yaz.",
                "Bir arkadaşına günlük rutini hakkında nasıl soru sorarsın?"
            ]
        },
        // --- A2.1 Seviyesi ---
        {
            level: "A2.1",
            name: "Basit Geçmiş Zaman (Düzenli ve Düzensiz Fiiller)",
            description: "Geçmiş olaylar ve deneyimler hakkında konuşma.",
            keywords: ["yaptım", "gittim", "yedim", "uyudum", "dündü", "geçen hafta", "geçen yıl"],
            practicePrompts: [
                "Dün ne yaptığını anlat (3-4 cümle).",
                "Dün akşam yemeğinde ne yedin?",
                "Bana son tatilinden bahset.",
                "Geçen hafta sonu yaptığın eğlenceli bir aktivite hakkında yaz."
            ]
        },
        {
            level: "A2.1",
            name: "Gelecek Zaman ('-ecek/-acak' Ekleri)",
            description: "Gelecek planlarını ve tahminleri ifade etme.",
            keywords: ["yapacağım", "gidecek", "yağmur yağacak", "gelecek hafta", "yarın"],
            practicePrompts: [
                "Gelecek hafta sonu için planların nelerdir?",
                "Gelecekte ne olacağını düşünüyorsun?",
                "Yarın ne yapacağın hakkında üç cümle yaz.",
                "Bir arkadaşına gelecek planları hakkında soru sor."
            ]
        },
        {
            level: "A2.1",
            name: "Karşılaştırma ve Üstünlük (Daha... En...)",
            description: "İnsanları, yerleri ve nesneleri karşılaştırma.",
            keywords: ["daha büyük", "daha küçük", "en güzel", "en ilginç", "daha uzun"],
            practicePrompts: [
                "Bildiğin iki şehri karşılaştırma kullanarak anlat.",
                "Şimdiye kadar ziyaret ettiğin en güzel yeri tarif et.",
                "İki hayvanı Türkçe sıfatlar kullanarak karşılaştır.",
                "İki arkadaşını 'daha uzun' kullanarak bir cümlede karşılaştır."
            ]
        },
        // --- A2.2 Seviyesi ---
        {
            level: "A2.2",
            name: "Belirsiz Geçmiş Zaman ('-miş' Eki)",
            description: "Duyulan veya sonradan fark edilen geçmiş olayları anlatma.",
            keywords: ["yapmış", "gitmiş", "gelmiş", "demiş", "olmuş"],
            practicePrompts: [
                "Dün televizyonda izlediğin bir film hakkında duyduklarını anlat.",
                "Bir arkadaşının sana anlattığı ilginç bir olayı tarif et.",
                "Üç cümle yaz, bir yerden duyduğun veya öğrendiğin bir şeyi anlatarak.",
                "Birine 'Duymuş musun?' diye nasıl sorarsın?"
            ]
        },
        {
            level: "A2.2",
            name: "Yer ve Yön Edatları",
            description: "Konumları ve yönleri tarif etme.",
            keywords: ["içinde", "üstünde", "altında", "yanında", "arasında", "arkasında", "önünde", "e", "dan/den", "içine", "dışına"],
            practicePrompts: [
                "Oturma odanı en az beş yer edatı kullanarak tarif et.",
                "Evinden yakındaki bir dükkana yol tarifi ver.",
                "Telefonun şu an nerede? Bir edat kullanarak söyle.",
                "Bir yerden başka bir yere hareket etmeyi anlatan bir cümle yaz."
            ]
        },
        {
            level: "A2.2",
            name: "Şartlı Cümleler (Tip 1 - Eğer... ise...)",
            description: "Gerçekleşme olasılığı olan durumlar ve sonuçları hakkında konuşma.",
            keywords: ["eğer", "ise", "olursa", "yaparsam"],
            practicePrompts: [
                "Yarın yağmur yağarsa ne yapacaksın?",
                "Bu hafta sonu boş zamanın olursa ne yapacaksın?",
                "Çok çalışırsan ne olabileceği hakkında üç cümle yaz.",
                "Cümleyi tamamla: 'Eğer yorgun hissedersem, ...'"
            ]
        },
        // --- B1.1 Seviyesi ---
        {
            level: "B1.1",
            name: "Şimdiki Zamanın Hikayesi ('-iyordu')",
            description: "Geçmişte devam eden eylemleri ve kesintiye uğrayan eylemleri anlatma.",
            keywords: ["yapıyordum", "izliyordu", "iken", "ne zaman", "birden bire", "aynı anda"],
            practicePrompts: [
                "Dün saat 8'de telefonun çaldığında ne yapıyordun?",
                "Bir şey yaparken başka bir şeyin olduğu bir durumu anlat.",
                "Hem şimdiki zamanın hikayesi hem de basit geçmiş zaman kullanarak üç cümle yaz.",
                "Bu zamanları kullanarak kısa bir hikaye anlat."
            ]
        },
        {
            level: "B1.1",
            name: "Geniş Zamanın Hikayesi ('-erdi')",
            description: "Geçmişteki tekrarlayan alışkanlıklar ve genellemeler hakkında konuşma.",
            keywords: ["yapardı", "giderdi", "eski", "çocukken", "genellikle"],
            practicePrompts: [
                "Çocukken ne yapmayı severdin?",
                "Eskiden hafta sonları ne yapardın?",
                "Üç cümle yaz, geçmişteki bir alışkanlığını anlatarak.",
                "Ebeveynlerin çocukken ne yapardı?"
            ]
        },
        {
            level: "B1.1",
            name: "Dolaylı Anlatım (Aktarma Cümleleri)",
            description: "Başkalarının söylediklerini veya sorduklarını aktarma.",
            keywords: ["dedi ki", "söyledi ki", "sordu ki", "rica etti"],
            practicePrompts: [
                "Arkadaşının dün sana planları hakkında söylediklerini aktar.",
                "Bir gazeteci olduğunu hayal et. Yakın zamanda yaşanan bir olay hakkında birinin söylediklerini aktar.",
                "Doğrudan bir soruyu dolaylı anlatıma dönüştür.",
                "'Bana söyledi ki...' kullanarak bir cümle yaz."
            ]
        },
    ],
    "de": [
        // --- A1.1 Level ---
        {
            level: "A1.1",
            name: "Grundlegende Begrüßungen und Vorstellungen",
            description: "Sich vorstellen, andere begrüßen und einfache persönliche Informationen austauschen.",
            keywords: ["Hallo", "Guten Morgen", "Guten Tag", "Guten Abend", "Gute Nacht", "Ich heiße", "Ich bin", "Wie geht es Ihnen?", "dir"],
            practicePrompts: [
                "Wie würdest du dich auf Deutsch vorstellen?",
                "Wie sagst du auf Deutsch 'Hallo, wie geht es dir?'",
                "Frag jemanden nach seinem Namen, den du gerade kennengelernt hast.",
                "Schreibe einen kurzen Dialog zur Begrüßung und Vorstellung."
            ]
        },
        {
            level: "A1.1",
            name: "Zahlen (0-20) und Telefonnummern",
            description: "Zahlen von 0 bis 20 sagen und verstehen, und Telefonnummern kommunizieren.",
            keywords: ["eins", "zwei", "drei", "zwanzig", "null", "Telefonnummer", "Wie ist deine Telefonnummer?"],
            practicePrompts: [
                "Kannst du auf Deutsch von 1 bis 10 zählen?",
                "Wie ist deine Telefonnummer? (Du kannst dir eine ausdenken!)",
                "Was bedeutet 'fünfzehn' auf Deutsch?",
                "Schreibe einen Satz mit der Zahl 'sieben'."
            ]
        },
        {
            level: "A1.1",
            name: "Tage, Monate und Jahreszeiten",
            description: "Über Wochentage, Monate und Jahreszeiten sprechen.",
            keywords: ["Montag", "Dienstag", "Januar", "Februar", "Frühling", "Sommer", "heute", "morgen", "gestern"],
            practicePrompts: [
                "Liste die Wochentage auf Deutsch auf.",
                "Was ist dein Lieblingsmonat und warum? (auf Deutsch)",
                "Welche Jahreszeit ist jetzt? Beschreibe sie auf Deutsch.",
                "Wie sagt man 'Mittwoch' auf Deutsch?"
            ]
        },
        // --- A1.2 Level ---
        {
            level: "A1.2",
            name: "Familienmitglieder und Beschreibungen",
            description: "Familienmitglieder vorstellen und mit einfachen Adjektiven beschreiben.",
            keywords: ["Mutter", "Vater", "Bruder", "Schwester", "Familie", "Eltern", "Kinder", "alt", "jung", "groß", "klein"],
            practicePrompts: [
                "Beschreibe deine Familie auf Deutsch (2-3 Sätze).",
                "Wie sagt man 'Großmutter' auf Deutsch?",
                "Wer ist dein Lieblingsfamilienmitglied und warum? (auf Deutsch)",
                "Schreibe einen Satz über deinen Bruder oder deine Schwester, beschreibe sie."
            ]
        },
        {
            level: "A1.2",
            name: "Farben und grundlegende Adjektive",
            description: "Farben identifizieren und beschreiben, und einfache Adjektive für Objekte verwenden.",
            keywords: ["rot", "blau", "grün", "groß", "klein", "gut", "schlecht", "neu", "alt", "schön"],
            practicePrompts: [
                "Was sind deine drei Lieblingsfarben auf Deutsch?",
                "Beschreibe dein Zimmer mit drei Adjektiven auf Deutsch.",
                "Wie sagt man 'lila' auf Deutsch?",
                "Schreibe einen Satz mit 'glücklich' und beschreibe ein Objekt."
            ]
        },
        {
            level: "A1.2",
            name: "Tägliche Routinen (Präsens)",
            description: "Über alltägliche Aktivitäten und Gewohnheiten im Präsens sprechen.",
            keywords: ["Ich stehe auf", "Ich frühstücke", "Ich gehe zur Arbeit/Schule", "Ich schlafe", "jeden Tag", "normalerweise", "immer"],
            practicePrompts: [
                "Beschreibe deine typische Morgenroutine auf Deutsch.",
                "Was machst du normalerweise am Wochenende?",
                "Schreibe drei Sätze darüber, was du jeden Abend machst.",
                "Wie fragst du jemanden nach seiner täglichen Routine?"
            ]
        },
        // --- A2.1 Level ---
        {
            level: "A2.1",
            name: "Perfekt (Vergangenheit)",
            description: "Über vergangene Ereignisse und Erfahrungen sprechen.",
            keywords: ["habe gemacht", "bin gegangen", "habe gegessen", "habe geschlafen", "gestern", "letzte Woche", "letztes Jahr"],
            practicePrompts: [
                "Beschreibe, was du gestern gemacht hast (3-4 Sätze).",
                "Was hast du gestern Abend gegessen?",
                "Erzähl mir von deinem letzten Urlaub.",
                "Schreibe über eine lustige Aktivität, die du letztes Wochenende gemacht hast."
            ]
        },
        {
            level: "A2.1",
            name: "Zukunft mit 'werden'",
            description: "Zukünftige Pläne und Vorhersagen ausdrücken.",
            keywords: ["ich werde", "er wird", "es wird regnen", "nächste Woche", "morgen"],
            practicePrompts: [
                "Was sind deine Pläne für das nächste Wochenende?",
                "Was denkst du, wird in der Zukunft passieren?",
                "Schreibe drei Sätze darüber, was du morgen tun wirst.",
                "Frag einen Freund nach seinen Zukunftsplänen."
            ]
        },
        {
            level: "A2.1",
            name: "Komparativ und Superlativ",
            description: "Personen, Orte und Dinge vergleichen.",
            keywords: ["größer", "kleiner", "schöner", "der größte", "der interessanteste", "größer als", "so ... wie"],
            practicePrompts: [
                "Vergleiche zwei Städte, die du kennst, mit Komparativen.",
                "Beschreibe den schönsten Ort, den du je besucht hast.",
                "Vergleiche zwei Tiere mit deutschen Adjektiven.",
                "Schreibe einen Satz, der zwei Freunde mit 'größer als' vergleicht."
            ]
        },
        // --- A2.2 Level ---
        {
            level: "A2.2",
            name: "Präteritum (Vergangenheit)",
            description: "Über abgeschlossene Handlungen und Zustände in der Vergangenheit sprechen (geschriebene Sprache).",
            keywords: ["ich war", "er hatte", "ich ging", "man sagte", "früher", "damals"],
            practicePrompts: [
                "Erzähle eine kurze Geschichte im Präteritum.",
                "Beschreibe einen wichtigen Tag in deiner Vergangenheit.",
                "Schreibe drei Sätze über etwas, das du in deiner Kindheit oft gemacht hast.",
                "Was war dein Lieblingsfach in der Schule?"
            ]
        },
        {
            level: "A2.2",
            name: "Präpositionen (Ort und Bewegung)",
            description: "Orte und Richtungen beschreiben.",
            keywords: ["in", "auf", "unter", "neben", "zwischen", "hinter", "vor", "zu", "von", "in den", "aus dem"],
            practicePrompts: [
                "Beschreibe dein Wohnzimmer mit mindestens fünf Präpositionen des Ortes.",
                "Gib eine Wegbeschreibung von deinem Zuhause zu einem nahegelegenen Geschäft.",
                "Wo ist dein Handy gerade? Verwende eine Präposition.",
                "Schreibe einen Satz über eine Bewegung von einem Ort zum anderen."
            ]
        },
        {
            level: "A2.2",
            name: "Konditionalsätze Typ 1 (Wenn... dann...)",
            description: "Über reale Möglichkeiten und deren Ergebnisse sprechen.",
            keywords: ["wenn", "dann", "wird", "kann", "sollte"],
            practicePrompts: [
                "Was wirst du tun, wenn es morgen regnet?",
                "Wenn du dieses Wochenende Zeit hast, was wirst du tun?",
                "Schreibe drei Sätze darüber, was passieren könnte, wenn du fleißig lernst.",
                "Vervollständige den Satz: 'Wenn ich müde bin, werde ich...'"
            ]
        },
        // --- B1.1 Level ---
        {
            level: "B1.1",
            name: "Plusquamperfekt (Vorvergangenheit)",
            description: "Über Handlungen sprechen, die vor einem anderen Zeitpunkt in der Vergangenheit abgeschlossen waren.",
            keywords: ["hatte gemacht", "war gegangen", "nachdem", "bevor", "schon"],
            practicePrompts: [
                "Erzähle eine Geschichte, in der du das Plusquamperfekt verwendest.",
                "Was hattest du getan, bevor du gestern eingeschlafen bist?",
                "Schreibe drei Sätze, die eine Handlung vor einer anderen in der Vergangenheit beschreiben.",
                "Wie würdest du sagen: 'Nachdem ich gegessen hatte, ging ich spazieren'?"
            ]
        },
        {
            level: "B1.1",
            name: "Passiv (Präsens und Präteritum)",
            description: "Handlungen beschreiben, bei denen der Fokus auf dem Vorgang oder dem Ergebnis liegt, nicht auf dem Handelnden.",
            keywords: ["wird gemacht", "wurde gebaut", "von", "durch", "Passivsätze"],
            practicePrompts: [
                "Beschreibe, wie Kaffee gemacht wird (im Passiv).",
                "Was wird in deiner Stadt gerade gebaut?",
                "Schreibe drei Sätze im Passiv über alltägliche Dinge.",
                "Formuliere den Satz 'Der Schüler öffnet die Tür' im Passiv."
            ]
        },
        {
            level: "B1.1",
            name: "Indirekte Rede (Konjunktiv I)",
            description: "Aussagen, Fragen und Bitten anderer wiedergeben.",
            keywords: ["er sagte, dass", "sie fragte, ob", "er bat mich", "Konjunktiv I"],
            practicePrompts: [
                "Gib wieder, was dein Freund dir gestern über seine Pläne erzählt hat.",
                "Stell dir vor, du bist Journalist. Berichte, was jemand über ein aktuelles Ereignis gesagt hat.",
                "Verwandle eine direkte Frage in die indirekte Rede.",
                "Schreibe einen Satz mit 'er sagte, dass...'"
            ]
        },
    ],
    "fr": [
        // --- A1.1 Niveau ---
        {
            level: "A1.1",
            name: "Salutations et Présentations de Base",
            description: "Se présenter, saluer les autres et échanger des informations personnelles simples.",
            keywords: ["bonjour", "salut", "bonsoir", "bonne nuit", "je m'appelle", "enchanté", "je suis", "tu es", "comment ça va"],
            practicePrompts: [
                "Comment te présenterais-tu en français ?",
                "Comment dit-on 'Bonjour, comment allez-vous ?' en français ?",
                "Demande le nom de quelqu'un que tu viens de rencontrer en français.",
                "Écris un court dialogue où tu salues quelqu'un et te présentes."
            ]
        },
        {
            level: "A1.1",
            name: "Nombres (0-20) et Numéros de Téléphone",
            description: "Dire et comprendre les nombres de 0 à 20, et communiquer des numéros de téléphone.",
            keywords: ["un", "deux", "trois", "vingt", "zéro", "numéro de téléphone", "quel est ton numéro de téléphone"],
            practicePrompts: [
                "Peux-tu compter de 1 à 10 en français ?",
                "Quel est ton numéro de téléphone ? (Tu peux en inventer un !)",
                "Que signifie 'quinze' en français ?",
                "Écris une phrase utilisant le nombre 'six'."
            ]
        },
        {
            level: "A1.1",
            name: "Jours, Mois et Saisons",
            description: "Parler des jours de la semaine, des mois de l'année et des saisons.",
            keywords: ["lundi", "mardi", "janvier", "février", "printemps", "été", "aujourd'hui", "demain", "hier"],
            practicePrompts: [
                "Liste les jours de la semaine en français.",
                "Quel est ton mois préféré et pourquoi ? (en français)",
                "Quelle saison sommes-nous maintenant ? Décris-la en français.",
                "Comment dit-on 'jeudi' en français ?"
            ]
        },
        // --- A1.2 Niveau ---
        {
            level: "A1.2",
            name: "Membres de la Famille et Descriptions",
            description: "Présenter et décrire les membres de sa famille en utilisant des adjectifs simples.",
            keywords: ["mère", "père", "frère", "sœur", "famille", "parents", "enfants", "vieux", "jeune", "grand", "petit"],
            practicePrompts: [
                "Décris ta famille en français (2-3 phrases).",
                "Comment dit-on 'grand-mère' en français ?",
                "Qui est ton membre de famille préféré et pourquoi ? (en français)",
                "Écris une phrase sur ton frère ou ta sœur, en les décrivant."
            ]
        },
        {
            level: "A1.2",
            name: "Couleurs et Adjectifs de Base",
            description: "Identifier et décrire les couleurs, et utiliser des adjectifs simples pour les objets.",
            keywords: ["rouge", "bleu", "vert", "grand", "petit", "bon", "mauvais", "nouveau", "ancien", "beau"],
            practicePrompts: [
                "Quelles sont tes trois couleurs préférées en français ?",
                "Décris ta chambre en utilisant trois adjectifs en français.",
                "Comment dit-on 'orange' en français ?",
                "Écris une phrase utilisant 'heureux' et décrivant un objet."
            ]
        },
        {
            level: "A1.2",
            name: "Routines Quotidiennes (Présent Simple)",
            description: "Parler des activités et habitudes quotidiennes en utilisant le présent simple.",
            keywords: ["je me lève", "je prends le petit-déjeuner", "je vais au travail/à l'école", "je dors", "tous les jours", "habituellement", "toujours"],
            practicePrompts: [
                "Décris ta routine matinale typique en français.",
                "Que fais-tu habituellement le week-end ?",
                "Écris trois phrases sur ce que tu fais chaque soir.",
                "Comment demandes-tu à quelqu'un sa routine quotidienne ?"
            ]
        },
        // --- A2.1 Niveau ---
        {
            level: "A2.1",
            name: "Passé Composé (Verbes Réguliers et Irréguliers)",
            description: "Parler d'événements et d'expériences passés.",
            keywords: ["j'ai fait", "je suis allé", "j'ai mangé", "j'ai dormi", "hier", "la semaine dernière", "l'année dernière"],
            practicePrompts: [
                "Décris ce que tu as fait hier (3-4 phrases).",
                "Qu'as-tu mangé au dîner hier soir ?",
                "Raconte-moi tes dernières vacances.",
                "Écris sur une activité amusante que tu as faite le week-end dernier."
            ]
        },
        {
            level: "A2.1",
            name: "Futur Proche (Aller + Infinitif)",
            description: "Exprimer des plans futurs et des prédictions proches.",
            keywords: ["je vais faire", "il va aller", "il va pleuvoir", "la semaine prochaine", "demain"],
            practicePrompts: [
                "Quels sont tes projets pour le week-end prochain ?",
                "Que penses-tu qu'il va se passer dans le futur ?",
                "Écris trois phrases sur ce que tu vas faire demain.",
                "Demande à un ami ses projets futurs."
            ]
        },
        {
            level: "A2.1",
            name: "Comparatifs et Superlatifs",
            description: "Comparer des personnes, des lieux et des choses.",
            keywords: ["plus grand", "plus petit", "plus beau", "le plus grand", "le plus intéressant", "plus grand que", "aussi ... que"],
            practicePrompts: [
                "Compare deux villes que tu connais en utilisant des comparatifs.",
                "Décris l'endroit le plus beau que tu aies jamais visité.",
                "Compare deux animaux en utilisant des adjectifs français.",
                "Écris une phrase comparant deux amis en utilisant 'plus grand que'."
            ]
        },
        // --- A2.2 Niveau ---
        {
            level: "A2.2",
            name: "Imparfait (Descriptions et Actions Habituelles Passées)",
            description: "Décrire des situations passées, des habitudes ou des actions en cours dans le passé.",
            keywords: ["je faisais", "il regardait", "quand", "soudain", "à ce moment-là"],
            practicePrompts: [
                "Décris ce que tu faisais hier soir à 20h.",
                "Raconte une anecdote de ton enfance en utilisant l'imparfait.",
                "Écris trois phrases décrivant une scène passée ou une habitude.",
                "Comment utiliserais-tu l'imparfait pour décrire ton ancien appartement ?"
            ]
        },
        {
            level: "A2.2",
            name: "Prépositions de Lieu et de Mouvement",
            description: "Décrire des lieux et des directions.",
            keywords: ["dans", "sur", "sous", "à côté de", "entre", "derrière", "devant", "vers", "de", "dans le", "hors de"],
            practicePrompts: [
                "Décris ton salon en utilisant au moins cinq prépositions de lieu.",
                "Donne des directions de chez toi à un magasin proche.",
                "Où est ton téléphone en ce moment ? Utilise une préposition.",
                "Écris une phrase sur le déplacement d'un lieu à un autre."
            ]
        },
        {
            level: "A2.2",
            name: "Conditionnel Présent (Souhaits, Conseils, Hypothèses)",
            description: "Exprimer des souhaits, donner des conseils ou formuler des hypothèses.",
            keywords: ["je voudrais", "tu devrais", "il ferait", "si", "peut-être"],
            practicePrompts: [
                "Que ferais-tu si tu gagnais à la loterie ?",
                "Donne un conseil à quelqu'un qui veut apprendre le français.",
                "Écris trois phrases sur ce que tu ferais si tu avais plus de temps.",
                "Complète la phrase : 'Si j'avais un super-pouvoir, je...' "
            ]
        },
        // --- B1.1 Niveau ---
        {
            level: "B1.1",
            name: "Plus-que-parfait (Antériorité dans le Passé)",
            description: "Parler d'actions qui se sont produites avant un autre moment dans le passé.",
            keywords: ["j'avais fait", "il était parti", "après que", "avant que", "déjà"],
            practicePrompts: [
                "Raconte une histoire où tu utilises le plus-que-parfait.",
                "Qu'avais-tu fait avant de t'endormir hier soir ?",
                "Écris trois phrases qui décrivent une action avant une autre dans le passé.",
                "Comment dirais-tu : 'Après que j'avais mangé, je suis allé me promener' ?"
            ]
        },
        {
            level: "B1.1",
            name: "Voix Passive (Présent et Passé Composé)",
            description: "Décrire des actions où l'accent est mis sur le processus ou le résultat, et non sur l'acteur.",
            keywords: ["est fait", "a été construit", "par", "Voix passive"],
            practicePrompts: [
                "Décris comment le café est préparé (à la voix passive).",
                "Qu'est-ce qui a été construit récemment dans ta ville ?",
                "Écris trois phrases à la voix passive sur des choses de la vie quotidienne.",
                "Transforme la phrase 'L'étudiant ouvre la porte' à la voix passive."
            ]
        },
        {
            level: "B1.1",
            name: "Discours Indirect (Rapporter des Paroles)",
            description: "Rapporter ce que d'autres ont dit, demandé ou demandé.",
            keywords: ["il a dit que", "elle m'a demandé si", "ils ont demandé de", "discours indirect"],
            practicePrompts: [
                "Rapporte ce que ton ami t'a dit hier sur ses projets.",
                "Imagine que tu es journaliste. Rapporte ce que quelqu'un a dit sur un événement récent.",
                "Transforme une question directe en discours indirect.",
                "Écris une phrase en utilisant 'il m'a dit que...'."
            ]
        },
    ],
    "es": [
        // --- A1.1 Nivel ---
        {
            level: "A1.1",
            name: "Saludos y Presentaciones Básicas",
            description: "Presentarse, saludar a otros e intercambiar información personal simple.",
            keywords: ["hola", "buenos días", "buenas tardes", "buenas noches", "me llamo", "encantado", "soy", "tú eres", "cómo estás"],
            practicePrompts: [
                "¿Cómo te presentarías en español?",
                "¿Cómo se dice 'Hola, ¿cómo estás?' en español?",
                "Pregúntale a alguien su nombre cuando lo acabas de conocer en español.",
                "Escribe un diálogo corto donde saludes a alguien y te presentes."
            ]
        },
        {
            level: "A1.1",
            name: "Números (0-20) y Números de Teléfono",
            description: "Decir y comprender números del 0 al 20, y comunicar números de teléfono.",
            keywords: ["uno", "dos", "tres", "veinte", "cero", "número de teléfono", "¿cuál es tu número de teléfono?"],
            practicePrompts: [
                "¿Puedes contar del 1 al 10 en español?",
                "¿Cuál es tu número de teléfono? (¡Puedes inventar uno!)",
                "¿Qué significa 'quince' en español?",
                "Escribe una frase usando el número 'siete'."
            ]
        },
        {
            level: "A1.1",
            name: "Días, Meses y Estaciones",
            description: "Hablar sobre los días de la semana, los meses del año y las estaciones.",
            keywords: ["lunes", "martes", "enero", "febrero", "primavera", "verano", "hoy", "mañana", "ayer"],
            practicePrompts: [
                "Lista los días de la semana en español.",
                "¿Cuál es tu mes favorito y por qué? (en español)",
                "¿Qué estación es ahora? Descríbela en español.",
                "¿Cómo se dice 'miércoles' en español?"
            ]
        },
        // --- A1.2 Nivel ---
        {
            level: "A1.2",
            name: "Miembros de la Familia y Descripciones",
            description: "Presentar y describir a los miembros de la familia usando adjetivos básicos.",
            keywords: ["madre", "padre", "hermano", "hermana", "familia", "padres", "hijos", "viejo", "joven", "alto", "bajo"],
            practicePrompts: [
                "Describe a tu familia en español (2-3 frases).",
                "¿Cómo se dice 'abuela' en español?",
                "¿Quién es tu miembro favorito de la familia y por qué? (en español)",
                "Escribe una frase sobre tu hermano o hermana, describiéndolos."
            ]
        },
        {
            level: "A1.2",
            name: "Colores y Adjetivos Básicos",
            description: "Identificar y describir colores, y usar adjetivos simples para objetos.",
            keywords: ["rojo", "azul", "verde", "grande", "pequeño", "bueno", "malo", "nuevo", "viejo", "bonito"],
            practicePrompts: [
                "¿Cuáles son tus tres colores favoritos en español?",
                "Describe tu habitación usando tres adjetivos en español.",
                "¿Cómo se dice 'naranja' en español?",
                "Escribe una frase usando 'feliz' y describiendo un objeto."
            ]
        },
        {
            level: "A1.2",
            name: "Rutinas Diarias (Presente Simple)",
            description: "Hablar sobre actividades y hábitos diarios usando el presente simple.",
            keywords: ["me levanto", "desayuno", "voy al trabajo/escuela", "duermo", "todos los días", "normalmente", "siempre"],
            practicePrompts: [
                "Describe tu rutina matutina típica en español.",
                "¿Qué haces normalmente los fines de semana?",
                "Escribe tres frases sobre lo que haces cada noche.",
                "¿Cómo le preguntas a alguien sobre su rutina diaria?"
            ]
        },
        // --- A2.1 Nivel ---
        {
            level: "A2.1",
            name: "Pretérito Indefinido (Pasado Simple)",
            description: "Hablar sobre eventos y experiencias pasadas.",
            keywords: ["fui", "hice", "comí", "dormí", "ayer", "la semana pasada", "el año pasado"],
            practicePrompts: [
                "Describe lo que hiciste ayer (3-4 frases).",
                "¿Qué cenaste anoche?",
                "Cuéntame sobre tus últimas vacaciones.",
                "Escribe sobre una actividad divertida que hiciste el fin de semana pasado."
            ]
        },
        {
            level: "A2.1",
            name: "Futuro Simple",
            description: "Expresar planes futuros y predicciones.",
            keywords: ["iré", "haré", "lloverá", "la próxima semana", "mañana"],
            practicePrompts: [
                "¿Cuáles son tus planes para el próximo fin de semana?",
                "¿Qué crees que pasará en el futuro?",
                "Escribe tres frases sobre lo que harás mañana.",
                "Pregúntale a un amigo sobre sus planes futuros."
            ]
        },
        {
            level: "A2.1",
            name: "Comparativos y Superlativos",
            description: "Comparar personas, lugares y cosas.",
            keywords: ["más grande", "más pequeño", "más hermoso", "el más grande", "el más interesante", "más alto que", "tan ... como"],
            practicePrompts: [
                "Compara dos ciudades que conozcas usando comparativos.",
                "Describe el lugar más bonito que hayas visitado.",
                "Compara dos animales usando adjetivos en español.",
                "Escribe una frase comparando dos amigos usando 'más alto que'."
            ]
        },
        // --- A2.2 Nivel ---
        {
            level: "A2.2",
            name: "Pretérito Imperfecto (Pasado Continuo y Descripciones)",
            description: "Describir acciones en progreso en el pasado y acciones habituales pasadas.",
            keywords: ["estaba haciendo", "estaban viendo", "mientras", "cuando", "de repente", "al mismo tiempo"],
            practicePrompts: [
                "¿Qué estabas haciendo ayer a las 8 PM cuando sonó tu teléfono?",
                "Describe una situación en la que estabas haciendo algo cuando sucedió otra cosa.",
                "Escribe tres frases usando el pretérito imperfecto y el indefinido.",
                "Cuenta una breve historia usando estos tiempos."
            ]
        },
        {
            level: "A2.2",
            name: "Preposiciones de Lugar y Movimiento",
            description: "Describir ubicaciones y direcciones.",
            keywords: ["en", "sobre", "debajo", "al lado de", "entre", "detrás", "delante de", "a", "de", "hacia", "desde"],
            practicePrompts: [
                "Describe tu sala de estar usando al menos cinco preposiciones de lugar.",
                "Da direcciones desde tu casa a una tienda cercana.",
                "¿Dónde está tu teléfono ahora mismo? Usa una preposición.",
                "Escribe una frase sobre moverte de un lugar a otro."
            ]
        },
        {
            level: "A2.2",
            name: "Condicionales Tipo 1 (Si... entonces...)",
            description: "Hablar sobre posibilidades reales y sus resultados.",
            keywords: ["si", "entonces", "haré", "podría", "puede"],
            practicePrompts: [
                "¿Qué harás si llueve mañana?",
                "Si tienes tiempo libre este fin de semana, ¿qué harás?",
                "Escribe tres frases sobre lo que podría pasar si estudias mucho.",
                "Completa la frase: 'Si me siento cansado, ...'"
            ]
        },
        // --- B1.1 Nivel ---
        {
            level: "B1.1",
            name: "Pretérito Pluscuamperfecto (Acciones Anteriores en el Pasado)",
            description: "Hablar sobre acciones que ocurrieron antes de otro momento en el pasado.",
            keywords: ["había hecho", "había ido", "después de que", "antes de que", "ya"],
            practicePrompts: [
                "Cuenta una historia usando el pretérito pluscuamperfecto.",
                "¿Qué habías hecho antes de quedarte dormido anoche?",
                "Escribe tres frases que describan una acción antes de otra en el pasado.",
                "¿Cómo dirías: 'Después de que había comido, fui a pasear'?"
            ]
        },
        {
            level: "B1.1",
            name: "Voz Pasiva (Presente y Pasado)",
            description: "Describir acciones donde el foco está en el proceso o el resultado, no en el actor.",
            keywords: ["es hecho", "fue construido", "por", "voz pasiva"],
            practicePrompts: [
                "Describe cómo se hace el café (en voz pasiva).",
                "¿Qué se está construyendo en tu ciudad ahora mismo?",
                "Escribe tres frases en voz pasiva sobre cosas cotidianas.",
                "Transforma la frase 'El estudiante abre la puerta' a voz pasiva."
            ]
        },
        {
            level: "B1.1",
            name: "Estilo Indirecto (Reportar Discurso)",
            description: "Reportar lo que otros han dicho, preguntado o pedido.",
            keywords: ["dijo que", "me preguntó si", "pidieron que", "discurso indirecto"],
            practicePrompts: [
                "Reporta lo que tu amigo te dijo ayer sobre sus planes.",
                "Imagina que eres periodista. Reporta lo que alguien dijo sobre un evento reciente.",
                "Transforma una pregunta directa en estilo indirecto.",
                "Escribe una frase usando 'me dijo que...'."
            ]
        },
    ],
    "it": [
        // --- A1.1 Livello ---
        {
            level: "A1.1",
            name: "Saluti e Presentazioni Base",
            description: "Presentarsi, salutare gli altri e scambiare semplici informazioni personali.",
            keywords: ["ciao", "buongiorno", "buonasera", "buonanotte", "mi chiamo", "piacere", "sono", "tu sei", "come stai"],
            practicePrompts: [
                "Come ti presenteresti in italiano?",
                "Come si dice 'Ciao, come stai?' in italiano?",
                "Chiedi il nome a qualcuno che hai appena conosciuto in italiano.",
                "Scrivi un breve dialogo in cui saluti qualcuno e ti presenti."
            ]
        },
        {
            level: "A1.1",
            name: "Numeri (0-20) e Numeri di Telefono",
            description: "Dire e comprendere i numeri da 0 a 20, e comunicare i numeri di telefono.",
            keywords: ["uno", "due", "tre", "venti", "zero", "numero di telefono", "qual è il tuo numero di telefono"],
            practicePrompts: [
                "Sai contare da 1 a 10 in italiano?",
                "Qual è il tuo numero di telefono? (Puoi inventarne uno!)",
                "Cosa significa 'quindici' in italiano?",
                "Scrivi una frase usando il numero 'sette'."
            ]
        },
        {
            level: "A1.1",
            name: "Giorni, Mesi e Stagioni",
            description: "Parlare dei giorni della settimana, dei mesi dell'anno e delle stagioni.",
            keywords: ["lunedì", "martedì", "gennaio", "febbraio", "primavera", "estate", "oggi", "domani", "ieri"],
            practicePrompts: [
                "Elenca i giorni della settimana in italiano.",
                "Qual è il tuo mese preferito e perché? (in italiano)",
                "Che stagione è adesso? Descrivila in italiano.",
                "Come si dice 'mercoledì' in italiano?"
            ]
        },
        // --- A1.2 Livello ---
        {
            level: "A1.2",
            name: "Membri della Famiglia e Descrizioni",
            description: "Presentare e descrivere i membri della famiglia usando aggettivi semplici.",
            keywords: ["madre", "padre", "fratello", "sorella", "famiglia", "genitori", "figli", "vecchio", "giovane", "alto", "basso"],
            practicePrompts: [
                "Descrivi la tua famiglia in italiano (2-3 frasi).",
                "Come si dice 'nonna' in italiano?",
                "Chi è il tuo membro preferito della famiglia e perché? (in italiano)",
                "Scrivi una frase su tuo fratello o tua sorella, descrivendoli."
            ]
        },
        {
            level: "A1.2",
            name: "Colori e Aggettivi Base",
            description: "Identificare e descrivere i colori, e usare aggettivi semplici per gli oggetti.",
            keywords: ["rosso", "blu", "verde", "grande", "piccolo", "buono", "cattivo", "nuovo", "vecchio", "bello"],
            practicePrompts: [
                "Quali sono i tuoi tre colori preferiti in italiano?",
                "Descrivi la tua stanza usando tre aggettivi in italiano.",
                "Come si dice 'arancione' in italiano?",
                "Scrivi una frase usando 'felice' e descrivendo un oggetto."
            ]
        },
        {
            level: "A1.2",
            name: "Routine Quotidiane (Presente Semplice)",
            description: "Parlare di attività e abitudini quotidiane usando il presente semplice.",
            keywords: ["mi sveglio", "faccio colazione", "vado al lavoro/a scuola", "dormo", "ogni giorno", "di solito", "sempre"],
            practicePrompts: [
                "Descrivi la tua tipica routine mattutina in italiano.",
                "Cosa fai di solito nel fine settimana?",
                "Scrivi tre frasi su cosa fai ogni sera.",
                "Come chiedi a qualcuno della sua routine quotidiana?"
            ]
        },
        // --- A2.1 Livello ---
        {
            level: "A2.1",
            name: "Passato Prossimo (Verbi Regolari e Irregolari)",
            description: "Parlare di eventi ed esperienze passate.",
            keywords: ["ho fatto", "sono andato", "ho mangiato", "ho dormito", "ieri", "la settimana scorsa", "l'anno scorso"],
            practicePrompts: [
                "Descrivi cosa hai fatto ieri (3-4 frasi).",
                "Cosa hai mangiato per cena ieri sera?",
                "Raccontami della tua ultima vacanza.",
                "Scrivi di un'attività divertente che hai fatto lo scorso fine settimana."
            ]
        },
        {
            level: "A2.1",
            name: "Futuro Semplice",
            description: "Esprimere piani futuri e previsioni.",
            keywords: ["farò", "andrò", "pioverà", "la prossima settimana", "domani"],
            practicePrompts: [
                "Quali sono i tuoi piani per il prossimo fine settimana?",
                "Cosa pensi che accadrà in futuro?",
                "Scrivi tre frasi su cosa farai domani.",
                "Chiedi a un amico dei suoi piani futuri."
            ]
        },
        {
            level: "A2.1",
            name: "Comparativi e Superlativi",
            description: "Comparare persone, luoghi e cose.",
            keywords: ["più grande", "più piccolo", "più bello", "il più grande", "il più interessante", "più alto di", "tanto ... quanto"],
            practicePrompts: [
                "Compara due città che conosci usando i comparativi.",
                "Descrivi il posto più bello che tu abbia mai visitato.",
                "Compara due animali usando aggettivi italiani.",
                "Scrivi una frase che paragona due amici usando 'più alto di'."
            ]
        },
        // --- A2.2 Livello ---
        {
            level: "A2.2",
            name: "Imperfetto (Descrizioni e Azioni Abituali nel Passato)",
            description: "Descrivere situazioni passate, abitudini o azioni in corso nel passato.",
            keywords: ["facevo", "guardava", "mentre", "quando", "all'improvviso", "nello stesso momento"],
            practicePrompts: [
                "Cosa stavi facendo ieri alle 20:00 quando è squillato il telefono?",
                "Descrivi una situazione in cui stavi facendo qualcosa quando è successo qualcos'altro.",
                "Scrivi tre frasi usando sia l'imperfetto che il passato prossimo.",
                "Racconta una breve storia usando questi tempi."
            ]
        },
        {
            level: "A2.2",
            name: "Preposizioni di Luogo e Movimento",
            description: "Descrivere posizioni e direzioni.",
            keywords: ["in", "su", "sotto", "vicino a", "tra", "dietro", "davanti a", "a", "da", "dentro", "fuori"],
            practicePrompts: [
                "Descrivi il tuo soggiorno usando almeno cinque preposizioni di luogo.",
                "Dai indicazioni dalla tua casa a un negozio vicino.",
                "Dov'è il tuo telefono in questo momento? Usa una preposizione.",
                "Scrivi una frase sul movimento da un luogo all'altro."
            ]
        },
        {
            level: "A2.2",
            name: "Condizionale Semplice (Desideri, Consigli, Ipotesi)",
            description: "Esprimere desideri, dare consigli o formulare ipotesi.",
            keywords: ["vorrei", "dovresti", "farebbe", "se", "forse"],
            practicePrompts: [
                "Cosa faresti se vincessi alla lotteria?",
                "Dai un consiglio a qualcuno che vuole imparare l'italiano.",
                "Scrivi tre frasi su cosa faresti se avessi più tempo.",
                "Completa la frase: 'Se avessi un superpotere, io...'"
            ]
        },
        // --- B1.1 Livello ---
        {
            level: "B1.1",
            name: "Trapassato Prossimo (Anteriorità nel Passato)",
            description: "Parlare di azioni che si sono verificate prima di un altro momento nel passato.",
            keywords: ["avevo fatto", "era andato", "dopo che", "prima che", "già"],
            practicePrompts: [
                "Racconta una storia in cui usi il trapassato prossimo.",
                "Cosa avevi fatto prima di addormentarti ieri sera?",
                "Scrivi tre frasi che descrivono un'azione prima di un'altra nel passato.",
                "Come diresti: 'Dopo che avevo mangiato, sono andato a fare una passeggiata'?"
            ]
        },
        {
            level: "B1.1",
            name: "Passivo (Presente e Passato Prossimo)",
            description: "Descrivere azioni in cui l'attenzione è sul processo o sul risultato, non sull'agente.",
            keywords: ["è fatto", "è stato costruito", "da", "forma passiva"],
            practicePrompts: [
                "Descrivi come viene preparato il caffè (in forma passiva).",
                "Cosa è stato costruito di recente nella tua città?",
                "Scrivi tre frasi in forma passiva su cose quotidiane.",
                "Trasforma la frase 'Lo studente apre la porta' in forma passiva."
            ]
        },
        {
            level: "B1.1",
            name: "Discorso Indiretto (Riportare il Discorso)",
            description: "Riportare ciò che altri hanno detto, chiesto o richiesto.",
            keywords: ["ha detto che", "mi ha chiesto se", "hanno chiesto di", "discorso indiretto"],
            practicePrompts: [
                "Riporta ciò che il tuo amico ti ha detto ieri sui suoi piani.",
                "Immagina di essere un giornalista. Riporta ciò che qualcuno ha detto su un evento recente.",
                "Trasforma una domanda diretta in discorso indiretto.",
                "Scrivi una frase usando 'mi ha detto che...'."
            ]
        },
    ],
    "pr": [
        // --- A1.1 Nível ---
        {
            level: "A1.1",
            name: "Saudações e Apresentações Básicas",
            description: "Apresentar-se, cumprimentar outras pessoas e trocar informações pessoais simples.",
            keywords: ["olá", "bom dia", "boa tarde", "boa noite", "meu nome é", "prazer", "eu sou", "você é", "como vai"],
            practicePrompts: [
                "Como você se apresentaria em português?",
                "Como se diz 'Olá, como você está?' em português?",
                "Pergunte o nome de alguém que você acabou de conhecer em português.",
                "Escreva um diálogo curto onde você cumprimenta alguém e se apresenta."
            ]
        },
        {
            level: "A1.1",
            name: "Números (0-20) e Números de Telefone",
            description: "Dizer e compreender números de 0 a 20, e comunicar números de telefone.",
            keywords: ["um", "dois", "três", "vinte", "zero", "número de telefone", "qual é o seu número de telefone"],
            practicePrompts: [
                "Você consegue contar de 1 a 10 em português?",
                "Qual é o seu número de telefone? (Você pode inventar um!)",
                "O que significa 'quinze' em português?",
                "Escreva uma frase usando o número 'sete'."
            ]
        },
        {
            level: "A1.1",
            name: "Dias, Meses e Estações",
            description: "Falar sobre os dias da semana, os meses do ano e as estações.",
            keywords: ["segunda-feira", "terça-feira", "janeiro", "fevereiro", "primavera", "verão", "hoje", "amanhã", "ontem"],
            practicePrompts: [
                "Liste os dias da semana em português.",
                "Qual é o seu mês favorito e por quê? (em português)",
                "Que estação é agora? Descreva-a em português.",
                "Como se diz 'quarta-feira' em português?"
            ]
        },
        // --- A1.2 Nível ---
        {
            level: "A1.2",
            name: "Membros da Família e Descrições",
            description: "Apresentar e descrever membros da família usando adjetivos básicos.",
            keywords: ["mãe", "pai", "irmão", "irmã", "família", "pais", "filhos", "velho", "jovem", "alto", "baixo"],
            practicePrompts: [
                "Descreva sua família em português (2-3 frases).",
                "Como se diz 'avó' em português?",
                "Quem é o seu membro favorito da família e por quê? (em português)",
                "Escreva uma frase sobre seu irmão ou irmã, descrevendo-os."
            ]
        },
        {
            level: "A1.2",
            name: "Cores e Adjetivos Básicos",
            description: "Identificar e descrever cores, e usar adjetivos simples para objetos.",
            keywords: ["vermelho", "azul", "verde", "grande", "pequeno", "bom", "ruim", "novo", "velho", "bonito"],
            practicePrompts: [
                "Quais são suas três cores favoritas em português?",
                "Descreva seu quarto usando três adjetivos em português.",
                "Como se diz 'laranja' em português?",
                "Escreva uma frase usando 'feliz' e descrevendo um objeto."
            ]
        },
        {
            level: "A1.2",
            name: "Rotinas Diárias (Presente Simples)",
            description: "Falar sobre atividades e hábitos diários usando o presente simples.",
            keywords: ["eu acordo", "eu tomo café da manhã", "eu vou para o trabalho/escola", "eu durmo", "todos os dias", "geralmente", "sempre"],
            practicePrompts: [
                "Descreva sua rotina matinal típica em português.",
                "O que você geralmente faz nos fins de semana?",
                "Escreva três frases sobre o que você faz todas as noites.",
                "Como você pergunta a alguém sobre sua rotina diária?"
            ]
        },
        // --- A2.1 Nível ---
        {
            level: "A2.1",
            name: "Passado Simples (Verbos Regulares e Irregulares)",
            description: "Falar sobre eventos e experiências passadas.",
            keywords: ["fiz", "fui", "comi", "dormi", "ontem", "semana passada", "ano passado"],
            practicePrompts: [
                "Descreva o que você fez ontem (3-4 frases).",
                "O que você comeu no jantar ontem à noite?",
                "Conte-me sobre suas últimas férias.",
                "Escreva sobre uma atividade divertida que você fez no fim de semana passado."
            ]
        },
        {
            level: "A2.1",
            name: "Futuro Simples",
            description: "Expressar planos futuros e previsões.",
            keywords: ["farei", "irei", "choverá", "próxima semana", "amanhã"],
            practicePrompts: [
                "Quais são seus planos para o próximo fim de semana?",
                "O que você acha que acontecerá no futuro?",
                "Escreva três frases sobre o que você fará amanhã.",
                "Pergunte a um amigo sobre seus planos futuros."
            ]
        },
        {
            level: "A2.1",
            name: "Comparativos e Superlativos",
            description: "Comparar pessoas, lugares e coisas.",
            keywords: ["maior", "menor", "mais bonito", "o maior", "o mais interessante", "mais alto que", "tão ... quanto"],
            practicePrompts: [
                "Compare duas cidades que você conhece usando comparativos.",
                "Descreva o lugar mais bonito que você já visitou.",
                "Compare dois animais usando adjetivos em português.",
                "Escreva uma frase comparando dois amigos usando 'mais alto que'."
            ]
        },
        // --- A2.2 Nível ---
        {
            level: "A2.2",
            name: "Pretérito Imperfeito (Ações Contínuas e Descrições no Passado)",
            description: "Descrever ações em andamento no passado e ações habituais passadas.",
            keywords: ["estava fazendo", "estavam assistindo", "enquanto", "quando", "de repente", "ao mesmo tempo"],
            practicePrompts: [
                "O que você estava fazendo ontem às 20h quando seu telefone tocou?",
                "Descreva uma situação em que você estava fazendo algo quando outra coisa aconteceu.",
                "Escreva três frases usando o pretérito imperfeito e o simples.",
                "Conte uma breve história usando esses tempos."
            ]
        },
        {
            level: "A2.2",
            name: "Preposições de Lugar e Movimento",
            description: "Descrever locais e direções.",
            keywords: ["em", "sobre", "sob", "ao lado de", "entre", "atrás", "na frente de", "para", "de", "para dentro", "para fora"],
            practicePrompts: [
                "Descreva sua sala de estar usando pelo menos cinco preposições de lugar.",
                "Dê instruções de sua casa para uma loja próxima.",
                "Onde está seu telefone agora? Use uma preposição.",
                "Escreva uma frase sobre mover-se de um lugar para outro."
            ]
        },
        {
            level: "A2.2",
            name: "Condicionais Tipo 1 (Se... então...)",
            description: "Falar sobre possibilidades reais e seus resultados.",
            keywords: ["se", "então", "farei", "poderia", "pode"],
            practicePrompts: [
                "O que você fará se chover amanhã?",
                "Se você tiver tempo livre neste fim de semana, o que fará?",
                "Escreva três frases sobre o que pode acontecer se você estudar muito.",
                "Complete a frase: 'Se eu me sentir cansado, eu...'"
            ]
        },
        // --- B1.1 Nível ---
        {
            level: "B1.1",
            name: "Pretérito Mais-Que-Perfeito Composto (Ações Anteriores no Passado)",
            description: "Falar sobre ações que ocorreram antes de outro momento no passado.",
            keywords: ["tinha feito", "tinha ido", "depois que", "antes que", "já"],
            practicePrompts: [
                "Conte uma história usando o pretérito mais-que-perfeito composto.",
                "O que você tinha feito antes de dormir ontem à noite?",
                "Escreva três frases que descrevam uma ação antes de outra no passado.",
                "Como você diria: 'Depois que eu tinha comido, fui passear'?"
            ]
        },
        {
            level: "B1.1",
            name: "Voz Passiva (Presente e Passado)",
            description: "Descrever ações onde o foco está no processo ou no resultado, não no ator.",
            keywords: ["é feito", "foi construído", "por", "voz passiva"],
            practicePrompts: [
                "Descreva como o café é feito (na voz passiva).",
                "O que está sendo construído em sua cidade agora?",
                "Escreva três frases na voz passiva sobre coisas cotidianas.",
                "Transforme a frase 'O aluno abre a porta' para a voz passiva."
            ]
        },
        {
            level: "B1.1",
            name: "Discurso Indireto (Reportar o Discurso)",
            description: "Reportar o que outras pessoas disseram, perguntaram ou pediram.",
            keywords: ["disse que", "perguntou se", "pediram para", "discurso indireto"],
            practicePrompts: [
                "Reporte o que seu amigo lhe disse ontem sobre os planos dele.",
                "Imagine que você é um jornalista. Reporte o que alguém disse sobre um evento recente.",
                "Transforme uma pergunta direta em discurso indireto.",
                "Escreva uma frase usando 'ele me disse que...'."
            ]
        },
    ],
    "ru": [
        // --- A1.1 Уровень ---
        {
            level: "A1.1",
            name: "Основные Приветствия и Представления",
            description: "Представиться, поприветствовать других и обменяться простой личной информацией.",
            keywords: ["привет", "здравствуйте", "доброе утро", "добрый вечер", "спокойной ночи", "меня зовут", "приятно познакомиться", "я", "ты", "как дела"],
            practicePrompts: [
                "Как бы вы представились по-русски?",
                "Как сказать по-русски 'Привет, как дела?'",
                "Спросите имя у человека, с которым вы только что познакомились, по-русски.",
                "Напишите короткий диалог, в котором вы кого-то приветствуете и представляетесь."
            ]
        },
        {
            level: "A1.1",
            name: "Числа (0-20) и Номера Телефонов",
            description: "Называть и понимать числа от 0 до 20, а также сообщать номера телефонов.",
            keywords: ["один", "два", "три", "двадцать", "ноль", "номер телефона", "какой у тебя номер телефона"],
            practicePrompts: [
                "Можете ли вы посчитать от 1 до 10 по-русски?",
                "Напишите свой номер телефона по-русски. (Можете придумать любой!)",
                "Что означает 'пятнадцать' по-русски?",
                "Напишите предложение, используя число 'семь'."
            ]
        },
        {
            level: "A1.1",
            name: "Дни, Месяцы и Времена Года",
            description: "Говорить о днях недели, месяцах года и временах года.",
            keywords: ["понедельник", "вторник", "январь", "февраль", "весна", "лето", "сегодня", "завтра", "вчера"],
            practicePrompts: [
                "Перечислите дни недели по-русски.",
                "Какой ваш любимый месяц и почему? (по-русски)",
                "Какое сейчас время года? Опишите его по-русски.",
                "Как сказать 'среда' по-русски?"
            ]
        },
        // --- A1.2 Уровень ---
        {
            level: "A1.2",
            name: "Члены Семьи и Описания",
            description: "Представлять и описывать членов семьи, используя простые прилагательные.",
            keywords: ["мать", "отец", "брат", "сестра", "семья", "родители", "дети", "старый", "молодой", "высокий", "низкий"],
            practicePrompts: [
                "Опишите свою семью по-русски (2-3 предложения).",
                "Как сказать 'бабушка' по-русски?",
                "Кто ваш любимый член семьи и почему? (по-русски)",
                "Напишите предложение о своем брате или сестре, описывая их."
            ]
        },
        {
            level: "A1.2",
            name: "Цвета и Основные Прилагательные",
            description: "Идентифицировать и описывать цвета, и использовать простые прилагательные для объектов.",
            keywords: ["красный", "синий", "зеленый", "большой", "маленький", "хороший", "плохой", "новый", "старый", "красивый"],
            practicePrompts: [
                "Какие ваши три любимых цвета по-русски?",
                "Опишите свою комнату, используя три прилагательных по-русски.",
                "Как сказать 'оранжевый' по-русски?",
                "Напишите предложение, используя слово 'счастливый' и описывая предмет."
            ]
        },
        {
            level: "A1.2",
            name: "Ежедневные Рутины (Настоящее Время)",
            description: "Говорить о повседневных делах и привычках, используя настоящее простое время.",
            keywords: ["я просыпаюсь", "я завтракаю", "я иду на работу/в школу", "я сплю", "каждый день", "обычно", "всегда"],
            practicePrompts: [
                "Опишите свою типичную утреннюю рутину по-русски.",
                "Что вы обычно делаете по выходным?",
                "Напишите три предложения о том, что вы делаете каждый вечер.",
                "Как вы спросите кого-то о его повседневной рутине?"
            ]
        },
        // --- A2.1 Уровень ---
        {
            level: "A2.1",
            name: "Прошедшее Время (Совершенный Вид)",
            description: "Говорить о завершенных событиях и опыте в прошлом.",
            keywords: ["сделал", "пошел", "съел", "поспал", "вчера", "на прошлой неделе", "в прошлом году"],
            practicePrompts: [
                "Опишите, что вы делали вчера (3-4 предложения).",
                "Что вы ели на ужин вчера вечером?",
                "Расскажите мне о своем последнем отпуске.",
                "Напишите о веселом занятии, которое вы делали в прошлые выходные."
            ]
        },
        {
            level: "A2.1",
            name: "Будущее Время",
            description: "Выражать планы на будущее и предсказания.",
            keywords: ["я сделаю", "он пойдет", "будет дождь", "на следующей неделе", "завтра"],
            practicePrompts: [
                "Какие у вас планы на следующие выходные?",
                "Что, по вашему мнению, произойдет в будущем?",
                "Напишите три предложения о том, что вы будете делать завтра.",
                "Спросите друга о его планах на будущее."
            ]
        },
        {
            level: "A2.1",
            name: "Сравнительная и Превосходная Степень",
            description: "Сравнивать людей, места и вещи.",
            keywords: ["больше", "меньше", "красивее", "самый большой", "самый интересный", "выше чем", "так же ... как"],
            practicePrompts: [
                "Сравните два города, которые вы знаете, используя сравнительные степени.",
                "Опишите самое красивое место, которое вы когда-либо посещали.",
                "Сравните двух животных, используя русские прилагательные.",
                "Напишите предложение, сравнивая двух друзей, используя 'выше чем'."
            ]
        },
        // --- A2.2 Уровень ---
        {
            level: "A2.2",
            name: "Прошедшее Время (Несовершенный Вид)",
            description: "Описывать действия в процессе в прошлом и обычные действия в прошлом.",
            keywords: ["делал", "смотрел", "пока", "когда", "внезапно", "в то же время"],
            practicePrompts: [
                "Что вы делали вчера в 20:00, когда зазвонил ваш телефон?",
                "Опишите ситуацию, когда вы что-то делали, а потом что-то произошло.",
                "Напишите три предложения, используя прошедшее время совершенного и несовершенного вида.",
                "Расскажите короткую историю, используя эти времена."
            ]
        },
        {
            level: "A2.2",
            name: "Предлоги Места и Движения",
            description: "Описывать местоположения и направления.",
            keywords: ["в", "на", "под", "рядом с", "между", "за", "перед", "к", "от", "внутрь", "из"],
            practicePrompts: [
                "Опишите свою гостиную, используя не менее пяти предлогов места.",
                "Дайте указания от вашего дома до ближайшего магазина.",
                "Где ваш телефон сейчас? Используйте предлог.",
                "Напишите предложение о движении из одного места в другое."
            ]
        },
        {
            level: "A2.2",
            name: "Условные Предложения Тип 1 (Если... то...)",
            description: "Говорить о реальных возможностях и их результатах.",
            keywords: ["если", "то", "будет", "может быть", "может"],
            practicePrompts: [
                "Что вы будете делать, если завтра пойдет дождь?",
                "Если у вас будет свободное время на этих выходных, что вы будете делать?",
                "Напишите три предложения о том, что может произойти, если вы будете усердно учиться.",
                "Завершите предложение: 'Если я устану, я...'"
            ]
        },
        // --- B1.1 Уровень ---
        {
            level: "B1.1",
            name: "Прошедшее Совершенное Время (Плюсквамперфект)",
            description: "Говорить о действиях, которые были завершены до другого момента в прошлом.",
            keywords: ["я сделал", "я пошел", "после того как", "прежде чем", "уже"],
            practicePrompts: [
                "Расскажите историю, используя плюсквамперфект.",
                "Что вы делали, прежде чем уснули вчера вечером?",
                "Напишите три предложения, описывающие одно действие до другого в прошлом.",
                "Как бы вы сказали: 'После того как я поел, я пошел гулять'?"
            ]
        },
        {
            level: "B1.1",
            name: "Страдательный Залог (Настоящее и Прошедшее Время)",
            description: "Описывать действия, где акцент делается на процессе или результате, а не на деятеле.",
            keywords: ["делается", "был построен", "кем-то", "через", "страдательный залог"],
            practicePrompts: [
                "Опишите, как готовится кофе (в страдательном залоге).",
                "Что сейчас строится в вашем городе?",
                "Напишите три предложения в страдательном залоге о повседневных вещах.",
                "Преобразуйте предложение 'Ученик открывает дверь' в страдательный залог."
            ]
        },
        {
            level: "B1.1",
            name: "Косвенная Речь (Передача Чужой Речи)",
            description: "Передавать то, что сказали, спросили или попросили другие.",
            keywords: ["он сказал, что", "она спросила, если", "они попросили", "косвенная речь"],
            practicePrompts: [
                "Передайте, что ваш друг сказал вам вчера о своих планах.",
                "Представьте, что вы журналист. Сообщите, что кто-то сказал о недавнем событии.",
                "Преобразуйте прямой вопрос в косвенную речь.",
                "Напишите предложение, используя 'он сказал мне, что...'."
            ]
        },
    ],
};