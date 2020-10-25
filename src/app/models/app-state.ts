import { CategoryState } from './../reducers/category.reducer';
import { RegionState } from './../reducers/region.reducer';
import { AuthState } from './../reducers/auth.reducer';
import { PostState } from './../reducers/post.reducer';
export interface AppState {
  readonly post: PostState;
  readonly auth: AuthState;
  readonly region: RegionState;
  readonly category: CategoryState;
}
