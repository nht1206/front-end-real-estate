import { AuthState } from './../reducers/auth.reducer';
import { PostState } from './../reducers/post.reducer';
export interface AppState {
  readonly post: PostState;
  readonly auth: AuthState;
}
