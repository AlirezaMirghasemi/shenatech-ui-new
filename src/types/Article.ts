import { User } from "./User";

export interface Article {
    id: number;
    title: string;
    content: string;
    status: 'draft' | 'pending' | 'approved' | 'rejected';
    user: User;
    slug: {
        id: number;
        title_persian: string;
        title_english: string;
    };
    poster: {
        id: number;
        path: string;
        type: 'poster' | 'profile' | 'content';
    } | null;
    tags: {
        id: number;
        title_persian: string;
        title_english: string;
    }[];
}
