import {
  DirectionActions,
  DirectionActionTypes,
} from './../actions/direction.action';
import { Direction } from '../models/direction';

export interface DirectionState {
  list: Array<Direction>;
  error: Error;
}

const initialState: DirectionState = {
  list: [],
  error: undefined,
};

export function DirectionReducer(
  state: DirectionState = initialState,
  action: DirectionActions
) {
  switch (action.type) {
    case DirectionActionTypes.LOAD_DIRECTION_SUCCESS:
      return { ...state, list: action.payload };
    case DirectionActionTypes.LOAD_DIRECTION_FAILURE:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}
