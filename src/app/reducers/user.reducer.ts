import { Post } from 'src/app/models/post';
import { Page } from './../models/page';
import { UserActions, UserActionTypes } from './../actions/user.actions';

export interface UserState {
  error: Error;
  posts: Page<Post>;
  isLoading: boolean;
}

const initialState: UserState = {
  error: undefined,
  posts: undefined,
  isLoading: false,
};

export function UserReducer(
  state: UserState = initialState,
  action: UserActions
) {
  switch (action.type) {
    case UserActionTypes.CHANGE_USER_PASSWORD:
      return { ...state, isLoading: true };
    case UserActionTypes.CHANGE_USER_PASSWORD_SUCCESS:
      return { ...state, isLoading: false };
    case UserActionTypes.CHANGE_USER_PASSWORD_FAILURE:
      return { ...state, error: action.payload, isLoading: false };
    case UserActionTypes.UPDATE_USER_INFORMATION:
      return { ...state, isLoading: true };
    case UserActionTypes.UPDATE_USER_INFORMATION_SUCCESS:
      return { ...state, isLoading: true };
    case UserActionTypes.UPDATE_USER_INFORMATION_FAILURE:
      return { ...state, error: action.payload, isLoading: false };
    case UserActionTypes.GET_USER_POSTS:
      return { ...state, isLoading: true };
    case UserActionTypes.GET_USER_POSTS_SUCCESS:
      return { ...state, posts: action.payload, isLoading: false };
    case UserActionTypes.GET_USER_POSTS_FAILURE:
      return { ...state, error: action.payload, isLoading: false };
    default:
      return state;
  }
}
