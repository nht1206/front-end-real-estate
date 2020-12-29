import { Direction } from './../models/direction';
import { Action } from '@ngrx/store';
export enum DirectionActionTypes {
  LOAD_DIRECTION = '[Direction] Load Direction',
  LOAD_DIRECTION_SUCCESS = '[Direction] Load Direction Success',
  LOAD_DIRECTION_FAILURE = '[Direction] Load Direction Failure',
}

export class LoadDirectionAction implements Action {
  readonly type: string = DirectionActionTypes.LOAD_DIRECTION;

  constructor(public payload?: any) {}
}

export class LoadDirectionSuccessAction implements Action {
  readonly type: string = DirectionActionTypes.LOAD_DIRECTION_SUCCESS;

  constructor(public payload: Array<Direction>) {}
}

export class LoadDirectionFailureAction implements Action {
  readonly type: string = DirectionActionTypes.LOAD_DIRECTION_FAILURE;

  constructor(public payload: string) {}
}

export type DirectionActions =
  | LoadDirectionAction
  | LoadDirectionSuccessAction
  | LoadDirectionFailureAction;
