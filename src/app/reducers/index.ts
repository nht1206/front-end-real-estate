import { ActionReducerMap } from '@ngrx/store';
import { PostReducer } from './post.reducer';
import { AuthReducer } from './auth.reducer';
import { RegionReducer } from './region.reducer';
import { CategoryReducer } from './category.reducer';
import { DirectionReducer } from './direction.reducer';
import { PostTypeReducer } from './post-type.reducer';
import { SupportReducer } from './support.reducer';
import { ReasonReducer } from './reason.reducer';
import { UserReducer } from './user.reducer';

export const reducers: ActionReducerMap<any> = {
  post: PostReducer,
  auth: AuthReducer,
  region: RegionReducer,
  category: CategoryReducer,
  direction: DirectionReducer,
  postType: PostTypeReducer,
  support: SupportReducer,
  reason: ReasonReducer,
  user: UserReducer,
};
