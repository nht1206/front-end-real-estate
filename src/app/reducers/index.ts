import { ActionReducerMap } from '@ngrx/store';
import { PostReducer } from './post.reducer';
import { AuthReducer } from './auth.reducer';
import { RegionReducer } from './region.reducer';
import { CategoryReducer } from './category.reducer';
import { DirectionReducer } from './direction.reducer';

export const reducers: ActionReducerMap<any> = {
  post: PostReducer,
  auth: AuthReducer,
  region: RegionReducer,
  category: CategoryReducer,
  direction: DirectionReducer,
};
