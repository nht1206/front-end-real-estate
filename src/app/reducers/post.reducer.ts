import { Search } from './../models/search';
import { PostActions, PostActionTypes } from './../actions/post.actions';
import { Post } from '../models/post';
import { Page } from '../models/page';

export interface PostState {
  list: Page<Post>;
  imageUrls: string[];
  loading: boolean;
  isPosting: boolean;
  error: Error;
  currentOption: Search;
  currentPost: Post;
  currentPostingPost: Post;
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
  isPosting: false,
  error: undefined,
  currentOption: new Search(),
  currentPost: null,
  currentPostingPost: null,
  imageUrls: [],
};

export function PostReducer(
  state: PostState = initialState,
  action: PostActions
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
    case PostActionTypes.GET_POST_BY_ID:
      return { ...state, loading: true };
    case PostActionTypes.GET_POST_BY_ID_SUCCESS:
      return { ...state, currentPost: action.payload, loading: false };
    case PostActionTypes.ADD_POST_FAILURE:
      return { ...state, error: action.payload, loading: false };
    case PostActionTypes.SUBMIT_POSTING_FORM:
      return { ...state, currentPostingPost: action.payload, isPosting: true };
    case PostActionTypes.ADDING_IMAGE_URLS:
      return { ...state, imageUrls: action.payload };
    default:
      return state;
  }
}
