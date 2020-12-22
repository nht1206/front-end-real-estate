import { Category } from './category';
import { PostImage } from './post-image';
import { PostType } from './post-type';
import { Direction } from './direction';
import { Region } from './region';
import { User } from './user';

export interface Post {
  id?: number;
  title: string;
  condition: boolean;
  address: string;
  region: Region;
  area: number;
  price: number;
  deal: boolean;
  viewCount?: number;
  content: string;
  status: boolean;
  approved: boolean;
  user: User;
  category: Category;
  postImages?: PostImage[];
  postType: PostType;
  direction: Direction;
  createdAt?: Date;
  updatedAt?: Date;
  userType: boolean;
}
