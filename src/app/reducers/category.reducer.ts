import {
  CategoryActions,
  CategoryActionTypes,
} from '../actions/category.actions';
import { Category } from '../models/category';

export interface CategoryState {
  list: Array<Category>;
  error: Error;
}

const initialState: CategoryState = {
  list: [],
  error: undefined,
};

export function CategoryReducer(
  state: CategoryState = initialState,
  action: CategoryActions
) {
  switch (action.type) {
    case CategoryActionTypes.LOAD_CATEGORY_SUCCESS:
      return { ...state, list: action.payload };
    case CategoryActionTypes.LOAD_CATEGORY_FAILURE:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}
