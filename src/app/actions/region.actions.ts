import { Region } from './../models/region';
import { Action } from '@ngrx/store';
export enum RegionActionTypes {
  LOAD_REGION = '[Region] Load Region',
  LOAD_REGION_SUCCESS = '[Region] Load Region Success',
  LOAD_REGION_FAILURE = '[Region] Load Region Failure',
}

export class LoadRegionAction implements Action {
    readonly type: string = RegionActionTypes.LOAD_REGION;

    constructor(public payload?: any) {
    }
}

export class LoadRegionSuccessAction implements Action {
    readonly type: string = RegionActionTypes.LOAD_REGION_SUCCESS;

    constructor(public payload: Array<Region> ) {
    }
}

export class LoadRegionFailureAction implements Action {
    readonly type: string = RegionActionTypes.LOAD_REGION_FAILURE;

    constructor(public payload: string ) {
    }
}

export type RegionActions  =
    | LoadRegionAction
    | LoadRegionSuccessAction
    | LoadRegionFailureAction;
