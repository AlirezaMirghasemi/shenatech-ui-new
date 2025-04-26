export interface Image {
    id: number;
    title: string | null;
    type: 'poster' | 'profile' | 'content';
    path: string;
    disk: string;
    mime_type: string | null;
    size: number | null;
    created_at: string;
    updated_at: string;
}
