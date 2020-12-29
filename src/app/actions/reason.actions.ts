import { Reason } from './../models/reason';
import { Action } from '@ngrx/store';
export enum ReasonActionTypes {
  LOAD_REASON = '[Reason] Load Reason',
  LOAD_REASON_SUCCESS = '[Reason] Load Reason Success',
  LOAD_REASON_FAILURE = '[Reason] Load Reason Failure',
}

export class LoadReasonAction implements Action {
  readonly type: string = ReasonActionTypes.LOAD_REASON;

  constructor(public payload?: any) {}
}

export class LoadReasonSuccessAction implements Action {
  readonly type: string = ReasonActionTypes.LOAD_REASON_SUCCESS;

  constructor(public payload: Array<Reason>) {}
}

export class LoadReasonFailureAction implements Action {
  readonly type: string = ReasonActionTypes.LOAD_REASON_FAILURE;

  constructor(public payload: string) {}
}

export type ReasonActions =
  | LoadReasonAction
  | LoadReasonSuccessAction
  | LoadReasonFailureAction;
