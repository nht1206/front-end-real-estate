import { Post } from './post';

export interface ViewCountStatistic {
  id: number;
  dateStatistic: Date;
  post: Post;
  viewCount: number;
}
