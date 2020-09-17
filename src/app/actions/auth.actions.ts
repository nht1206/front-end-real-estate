import { User } from './../models/user';
import { Action } from '@ngrx/store';

export enum AuthActionTypes {
  LOGIN = '[Auth] Login',
  LOGIN_SUCCESS = '[Auth] Login Success',
  LOGIN_FAILURE = '[Auth] Login Failure',
  LOAD_CURRENT_USER = '[User] Load Current User',
  LOAD_CURRENT_USER_SUCCESS = '[User] Load Current User Success',
  LOAD_CURRENT_USER_FAILURE = '[User] Load Current User Failure',
  LOGOUT = '[Auth] Logout',
  LOGOUT_FAILURE = '[Auth] Logout Failure',
}

export class Login implements Action {
  readonly type = AuthActionTypes.LOGIN;
  constructor(public payload: any) {}
}

export class LoginSuccess implements Action {
  readonly type = AuthActionTypes.LOGIN_SUCCESS;
  constructor(public payload: string) {}
}

export class LoginFailure implements Action {
  readonly type = AuthActionTypes.LOGIN_FAILURE;
  constructor(public payload: string) {}
}

export class LoadCurrentUser implements Action {
  readonly type = AuthActionTypes.LOAD_CURRENT_USER;
}

export class LoadCurrentUserSuccess implements Action {
  readonly type = AuthActionTypes.LOAD_CURRENT_USER_SUCCESS;
  constructor(public payload: User) {}
}

export class LoadCurrentUserFailure implements Action {
  readonly type = AuthActionTypes.LOAD_CURRENT_USER_FAILURE;
}

export class Logout implements Action {
  readonly type = AuthActionTypes.LOGOUT;
}

export class LogoutFailure implements Action {
  readonly type = AuthActionTypes.LOGOUT_FAILURE;
  constructor(public payload: string) {}
}

export type AuthActions =
  | Login
  | LoginSuccess
  | LoginFailure
  | Logout
  | LogoutFailure
  | LoadCurrentUser
  | LoadCurrentUserSuccess
  | LoadCurrentUserFailure;
