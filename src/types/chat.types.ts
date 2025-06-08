export interface Message {
    id: string;
    roomId: string;
    userId: string;
    message: string;
    role: 'user' | 'assistant';
    createdAt: Date;
    updatedAt: Date | null;
}

export interface ChatRoom {
    id: string;
    userId: string;
    title: string;
    language: string;
    createdAt: Date;
    updatedAt: Date | null;
    messages?: Message[];
}
