import { ActionReducerMap } from '@ngrx/store';
import { PostReducer } from './post.reducer';

export const reducers: ActionReducerMap<any> = {
  post: PostReducer,
};
