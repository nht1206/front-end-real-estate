import { Post } from 'src/app/models/post';
import { Page } from './../models/page';
import { Password } from './../models/password';
import { User } from './../models/user';
import { Action } from '@ngrx/store';
export enum UserActionTypes {
  UPDATE_USER_INFORMATION = '[User] Update User Information',
  UPDATE_USER_INFORMATION_SUCCESS = '[User] Update User Information Success',
  UPDATE_USER_INFORMATION_FAILURE = '[User] Update User Information Failure',
  CHANGE_USER_PASSWORD = '[User] Change User Password',
  CHANGE_USER_PASSWORD_SUCCESS = '[User] Change User Password Success',
  CHANGE_USER_PASSWORD_FAILURE = '[User] Change User Password Failure',
  GET_USER_POSTS = '[User] Get User Posts',
  GET_USER_POSTS_SUCCESS = '[User] Get User Posts Success',
  GET_USER_POSTS_FAILURE = '[User] Get User Posts Failure',
}

export class UpdateUserInformation implements Action {
  readonly type = UserActionTypes.UPDATE_USER_INFORMATION;
  constructor(public payload: User) {}
}

export class UpdateUserInformationSuccess implements Action {
  readonly type = UserActionTypes.UPDATE_USER_INFORMATION_SUCCESS;
  constructor(public payload: User) {}
}

export class UpdateUserInformationFailure implements Action {
  readonly type = UserActionTypes.UPDATE_USER_INFORMATION_FAILURE;
  constructor(public payload: Error) {}
}

export class ChangeUserPassword implements Action {
  readonly type = UserActionTypes.CHANGE_USER_PASSWORD;
  constructor(public payload: Password) {}
}

export class ChangeUserPasswordSuccess implements Action {
  readonly type = UserActionTypes.CHANGE_USER_PASSWORD_SUCCESS;
  constructor(public payload?: any) {}
}

export class ChangeUserPasswordFailure implements Action {
  readonly type = UserActionTypes.CHANGE_USER_PASSWORD_FAILURE;
  constructor(public payload: Error) {}
}

export class GetUserPosts implements Action {
  readonly type = UserActionTypes.GET_USER_POSTS;
  constructor(public payload: { page: number; search: string }) {}
}

export class GetUserPostsSuccess implements Action {
  readonly type = UserActionTypes.GET_USER_POSTS_SUCCESS;
  constructor(public payload: Page<Post>) {}
}

export class GetUserPostsFailure implements Action {
  readonly type = UserActionTypes.GET_USER_POSTS_FAILURE;
  constructor(public payload: Error) {}
}

export type UserActions =
  | UpdateUserInformation
  | UpdateUserInformationSuccess
  | UpdateUserInformationFailure
  | ChangeUserPassword
  | ChangeUserPasswordSuccess
  | ChangeUserPasswordFailure
  | GetUserPosts
  | GetUserPostsSuccess
  | GetUserPostsFailure;
