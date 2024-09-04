export interface ChatMessage {
    user: string;
    message: string;
    color: string;
}

export interface Score {
    user: string;
    score: number;
    color: string;
    animClass?: string;
    isMe?: boolean;
    lastPosition?: number;
}