import { Support } from './../models/support';
import { Action } from '@ngrx/store';
export enum SupportActionTypes {
  LOAD_SUPPORT = '[Support] Load Support',
  LOAD_SUPPORT_SUCCESS = '[Support] Load Support Success',
  LOAD_SUPPORT_FAILURE = '[Support] Load Support Failure',
  CREATE_SUPPORT = '[Support] Create Support',
  CREATE_SUPPORT_SUCCESS = '[Support] Create Support Success',
  CREATE_SUPPORT_FAILURE = '[Support] Create Support Failure',
}

export class LoadSupportAction implements Action {
  readonly type: string = SupportActionTypes.LOAD_SUPPORT;

  constructor(public payload?: any) {}
}

export class LoadSupportSuccessAction implements Action {
  readonly type: string = SupportActionTypes.LOAD_SUPPORT_SUCCESS;

  constructor(public payload: Array<Support>) {}
}

export class LoadSupportFailureAction implements Action {
  readonly type: string = SupportActionTypes.LOAD_SUPPORT_FAILURE;

  constructor(public payload: string) {}
}

export class CreateSupportAction implements Action {
  readonly type: string = SupportActionTypes.CREATE_SUPPORT;

  constructor(public payload?: any) {}
}

export class CreateSupportSuccessAction implements Action {
  readonly type: string = SupportActionTypes.CREATE_SUPPORT_SUCCESS;

  constructor(public payload: Support) {}
}

export class CreateSupportFailureAction implements Action {
  readonly type: string = SupportActionTypes.CREATE_SUPPORT_FAILURE;

  constructor(public payload: string) {}
}

export type SupportActions =
  | LoadSupportAction
  | LoadSupportSuccessAction
  | LoadSupportFailureAction
  | CreateSupportAction
  | CreateSupportSuccessAction
  | CreateSupportFailureAction;
