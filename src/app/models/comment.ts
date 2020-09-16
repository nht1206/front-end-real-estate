import { Post } from './post';
import { User } from './user';
import { Reply } from './reply';
export interface Comment {
  id: number;
  content: string;
  status: boolean;
  post: Post;
  user: User;
  replies: Reply[];
  createdAt: Date;
  updatedAt: Date;
}
