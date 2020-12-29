import { Support } from './../models/support';
import {
  SupportActions,
  SupportActionTypes,
} from './../actions/support.actions';

export interface SupportState {
  list: Array<Support>;
  error: Error;
  sendingSupport: Support;
}

const initialState: SupportState = {
  list: [],
  sendingSupport: undefined,
  error: undefined,
};

export function SupportReducer(
  state: SupportState = initialState,
  action: SupportActions
) {
  switch (action.type) {
    case SupportActionTypes.LOAD_SUPPORT_SUCCESS:
      return { ...state, list: action.payload };
    case SupportActionTypes.LOAD_SUPPORT_FAILURE:
      return { ...state, error: action.payload };
    case SupportActionTypes.CREATE_SUPPORT_SUCCESS:
      return { ...state, sendingSupport: action.payload };
    case SupportActionTypes.CREATE_SUPPORT_FAILURE:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}
