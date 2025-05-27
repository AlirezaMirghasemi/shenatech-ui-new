import { User } from './User';
import { Tag } from './Tag';
import { Slug } from './Slug';
import { Status } from '@/constants/data/Status';
import { ImageType } from '@/constants/data/Type';

export interface Video {
    id: number;
    title: string;
    content: string | null;
    status: Status;
    url: string;
    user: User;
    slug: Slug;
     poster: {
        id: number;
        path: string;
        type: ImageType.VIDEO;
      } | null;
    tags: Tag[];
    created_at: string;
    updated_at: string;
}
