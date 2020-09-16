import {User} from './user';
import {Comment} from './comment';

export interface Reply {
  id: number;
  content: string;
  status: boolean;
  comment: Comment;
  user: User;
  createdAt: Date;
  updatedAt: Date;
}
