import { RegionActions, RegionActionTypes } from './../actions/region.action';
import { Region } from '../models/region';

export interface RegionState {
  list: Array<Region>;
  error: Error;
}

const initialState: RegionState = {
  list: [],
  error: undefined,
};

export function RegionReducer(
  state: RegionState = initialState,
  action: RegionActions
) {
  switch (action.type) {
    case RegionActionTypes.LOAD_REGION_SUCCESS:
      return { ...state, list: action.payload };
    case RegionActionTypes.LOAD_REGION_FAILURE:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}
