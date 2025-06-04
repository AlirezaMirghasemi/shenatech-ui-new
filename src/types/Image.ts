import { ImageType } from "@/constants/data/Type";

export interface Image {
    id: number;
    title: string | null;
    type: ImageType;
    path: string;
    disk: string;
    mime_type: string | null;
    size: number | null;
    created_at: string;
    updated_at: string;
}
export interface CreateImage {
    title: string | null;
    type: ImageType;
    path: string;
    disk: string;
    mime_type: string | null;
    size: number | null;
}
