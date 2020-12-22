import { PostType } from './../models/post-type';
import { Action } from '@ngrx/store';
export enum PostTypeActionTypes {
  LOAD_POST_TYPE = '[PostType] Load PostType',
  LOAD_POST_TYPE_SUCCESS = '[PostType] Load PostType Success',
  LOAD_POST_TYPE_FAILURE = '[PostType] Load PostType Failure',
}

export class LoadPostTypeAction implements Action {
  readonly type: string = PostTypeActionTypes.LOAD_POST_TYPE;

  constructor(public payload?: any) {}
}

export class LoadPostTypeSuccessAction implements Action {
  readonly type: string = PostTypeActionTypes.LOAD_POST_TYPE_SUCCESS;

  constructor(public payload: Array<PostType>) {}
}

export class LoadPostTypeFailureAction implements Action {
  readonly type: string = PostTypeActionTypes.LOAD_POST_TYPE_FAILURE;

  constructor(public payload: string) {}
}

export type PostTypeActions =
  | LoadPostTypeAction
  | LoadPostTypeSuccessAction
  | LoadPostTypeFailureAction;
