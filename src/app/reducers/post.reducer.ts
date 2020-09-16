import { Search } from './../models/search';
import { PostAction, PostActionTypes } from './../actions/post.action';
import { Post } from '../models/post';
import { Page } from '../models/page';

export interface PostState {
  list: Page<Post>;
  loading: boolean;
  error: Error;
  currentOption: Search;
}

const initialState: PostState = {
  list: {
    content: [],
    empty: true,
    last: true,
    first: true,
    number: 0,
    numberOfElements: 0,
    size: 10,
    totalElements: 0,
    totalPages: 0,
  },
  loading: false,
  error: undefined,
  currentOption: new Search(),
};

export function PostReducer(
  state: PostState = initialState,
  action: PostAction
) {
  switch (action.type) {
    case PostActionTypes.LOAD_POST:
      return { ...state, loading: true };
    case PostActionTypes.LOAD_POST_SUCCESS:
      return { ...state, list: action.payload, loading: false };
    case PostActionTypes.LOAD_POST_FAILURE:
      return { ...state, error: action.payload, loading: false };
    case PostActionTypes.ADD_POST:
      return { ...state, loading: true };
    case PostActionTypes.ADD_POST_FAILURE:
      return { ...state, error: action.payload, loading: false };
    case PostActionTypes.DELETE_POST:
      return { ...state, loading: true };
    case PostActionTypes.DELETE_POST_FAILURE:
      return { ...state, error: action.payload, loading: false };
    case PostActionTypes.SEARCH_ALL_POST:
      return { ...state, loading: true, currentOption: action.payload };
    case PostActionTypes.SEARCH_ALL_POST_SUCCESS:
      return { ...state, list: action.payload, loading: false };
    case PostActionTypes.SEARCH_ALL_POST_FAILURE:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
}
