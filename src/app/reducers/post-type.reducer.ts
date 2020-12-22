import {
  PostTypeActions,
  PostTypeActionTypes,
} from './../actions/post-type.action';
import { PostType } from '../models/post-type';

export interface PostTypeState {
  list: Array<PostType>;
  error: Error;
}

const initialState: PostTypeState = {
  list: [],
  error: undefined,
};

export function PostTypeReducer(
  state: PostTypeState = initialState,
  action: PostTypeActions
) {
  switch (action.type) {
    case PostTypeActionTypes.LOAD_POST_TYPE_SUCCESS:
      return { ...state, list: action.payload };
    case PostTypeActionTypes.LOAD_POST_TYPE_FAILURE:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}
