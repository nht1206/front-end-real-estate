import { Action } from '@ngrx/store';
import { Category } from '../models/category';
export enum CategoryActionTypes {
  LOAD_CATEGORY = '[Category] Load Category',
  LOAD_CATEGORY_SUCCESS = '[Category] Load Category Success',
  LOAD_CATEGORY_FAILURE = '[Category] Load Category Failure',
}

export class LoadCategoryAction implements Action {
  readonly type: string = CategoryActionTypes.LOAD_CATEGORY;

  constructor(public payload?: any) {}
}

export class LoadCategorySuccessAction implements Action {
  readonly type: string = CategoryActionTypes.LOAD_CATEGORY_SUCCESS;

  constructor(public payload: Array<Category>) {}
}

export class LoadCategoryFailureAction implements Action {
  readonly type: string = CategoryActionTypes.LOAD_CATEGORY_FAILURE;

  constructor(public payload: string) {}
}

export type CategoryActions =
  | LoadCategoryAction
  | LoadCategorySuccessAction
  | LoadCategoryFailureAction;
