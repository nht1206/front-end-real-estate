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
}

export class UpdateUserInformation implements Action {
  readonly type = UserActionTypes.UPDATE_USER_INFORMATION;
  constructor(private payload?: User) {}
}

export class UpdateUserInformationSuccess implements Action {
  readonly type = UserActionTypes.UPDATE_USER_INFORMATION_SUCCESS;
  constructor(private payload: User) {}
}

export class UpdateUserInformationFailure implements Action {
  readonly type = UserActionTypes.UPDATE_USER_INFORMATION_FAILURE;
  constructor(private payload: Error) {}
}

export class ChangeUserPassword implements Action {
  readonly type = UserActionTypes.CHANGE_USER_PASSWORD;
  constructor(private payload: Password) {}
}

export class ChangeUserPasswordSuccess implements Action {
  readonly type = UserActionTypes.CHANGE_USER_PASSWORD_SUCCESS;
  constructor(private payload?: any) {}
}

export class ChangeUserPasswordFailure implements Action {
  readonly type = UserActionTypes.CHANGE_USER_PASSWORD_FAILURE;
  constructor(private payload: Error) {}
}

export type UserActions =
  | UpdateUserInformation
  | UpdateUserInformationSuccess
  | UpdateUserInformationFailure
  | ChangeUserPassword
  | ChangeUserPasswordSuccess
  | ChangeUserPasswordFailure;
