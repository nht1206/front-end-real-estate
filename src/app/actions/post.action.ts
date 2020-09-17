import { Search } from './../models/search';
import { Page } from './../models/page';
import { Action } from '@ngrx/store';
import { Post } from '../models/post';

export enum PostActionTypes {
  LOAD_POST = '[Post] Load Post',
  LOAD_POST_SUCCESS = '[Post] Load Post Success',
  LOAD_POST_FAILURE = '[Post] Load Post Failure',
  ADD_POST = '[Post] Add Post',
  ADD_POST_SUCCESS = '[Post] Add Post Success',
  ADD_POST_FAILURE = '[Post] Add Post Failure',
  DELETE_POST = '[Post] Delete Post',
  DELETE_POST_SUCCESS = '[Post] Delete Post Success',
  DELETE_POST_FAILURE = '[Post] Delete Post Failure',
  SEARCH_ALL_POST = '[Post] Search All Post',
  SEARCH_ALL_POST_SUCCESS = '[Post] Search All Post Success',
  SEARCH_ALL_POST_FAILURE = '[Post] Search All Post Failure',
}

export class LoadPostAction implements Action {
  readonly type = PostActionTypes.LOAD_POST;

  constructor(public payload: number) {}
}

export class LoadPostSuccessAction implements Action {
  readonly type = PostActionTypes.LOAD_POST_SUCCESS;

  constructor(public payload: Page<Post>) {}
}

export class LoadPostFailureAction implements Action {
  readonly type = PostActionTypes.LOAD_POST_FAILURE;

  constructor(public payload: string) {}
}

export class AddPostAction implements Action {
  readonly type = PostActionTypes.ADD_POST;

  constructor(public payload: Post) {}
}

export class AddPostFailureAction implements Action {
  readonly type = PostActionTypes.ADD_POST_FAILURE;

  constructor(public payload: string) {}
}

export class DeletePostAction implements Action {
  readonly type = PostActionTypes.DELETE_POST;

  constructor(public payload: string) {}
}

export class DeletePostFailureAction implements Action {
  readonly type = PostActionTypes.DELETE_POST_FAILURE;

  constructor(public payload: string) {}
}

export class SearchAllPostAction implements Action {
  readonly type = PostActionTypes.SEARCH_ALL_POST;

  constructor(public payload: Search, public page: number) {}
}

export class SearchAllPostSuccessAction implements Action {
  readonly type = PostActionTypes.SEARCH_ALL_POST_SUCCESS;

  constructor(public payload: Page<Post>) {}
}

export class SearchAllPostFailureAction implements Action {
  readonly type = PostActionTypes.SEARCH_ALL_POST_FAILURE;

  constructor(public payload: string) {}
}

export type PostActions =
  | LoadPostAction
  | LoadPostSuccessAction
  | LoadPostFailureAction
  | AddPostAction
  | AddPostFailureAction
  | DeletePostAction
  | DeletePostFailureAction
  | SearchAllPostAction
  | SearchAllPostSuccessAction
  | SearchAllPostFailureAction;
