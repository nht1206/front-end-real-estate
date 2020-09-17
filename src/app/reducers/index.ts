import { ActionReducerMap } from '@ngrx/store';
import { PostReducer } from './post.reducer';
import { AuthReducer } from './auth.reducer';

export const reducers: ActionReducerMap<any> = {
  post: PostReducer,
  auth: AuthReducer,
};
