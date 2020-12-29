import { ReasonActions, ReasonActionTypes } from './../actions/reason.actions';
import { Reason } from '../models/reason';

export interface ReasonState {
  list: Array<Reason>;
  error: Error;
}

const initialState: ReasonState = {
  list: [],
  error: undefined,
};

export function ReasonReducer(
  state: ReasonState = initialState,
  action: ReasonActions
) {
  switch (action.type) {
    case ReasonActionTypes.LOAD_REASON_SUCCESS:
      return { ...state, list: action.payload };
    case ReasonActionTypes.LOAD_REASON_FAILURE:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}
