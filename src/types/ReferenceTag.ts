import { Article } from "./Article";
import { Tag } from "./Tag";
import { Video } from "./Video";
import { Event } from "./Event";

export interface ReferenceTag {
    id: number;
    tag: Tag;
    article: Article | null;
    video: Video | null;
    event: Event | null;
    created_at: string;
    updated_at: string;
}
