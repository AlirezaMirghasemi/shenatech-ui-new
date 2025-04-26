import { User } from './User';
import { Tag } from './Tag';
import { Image } from './Image';
import { Slug } from './Slug';

export interface Video {
    id: number;
    title: string;
    content: string | null;
    status: 'draft' | 'pending' | 'approved' | 'rejected';
    url: string;
    user: User;
    slug: Slug;
    poster: Image | null;
    tags: Tag[];
    created_at: string;
    updated_at: string;
}
