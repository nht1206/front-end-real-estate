import { SupportState } from './../reducers/support.reducer';
import { PostTypeState } from './../reducers/post-type.reducer';
import { DirectionState } from './../reducers/direction.reducer';
import { CategoryState } from './../reducers/category.reducer';
import { RegionState } from './../reducers/region.reducer';
import { AuthState } from './../reducers/auth.reducer';
import { PostState } from './../reducers/post.reducer';
export interface AppState {
  readonly post: PostState;
  readonly auth: AuthState;
  readonly region: RegionState;
  readonly category: CategoryState;
  readonly direction: DirectionState;
  readonly postType: PostTypeState;
  readonly support: SupportState;
}
