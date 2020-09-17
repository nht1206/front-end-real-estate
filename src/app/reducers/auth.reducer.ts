import { AuthActions, AuthActionTypes } from './../actions/auth.actions';
import { User } from './../models/user';

export const authFeatureKey = 'auth';

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  errorMessage: string | null;
  isLoading: boolean;
}

export const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
  errorMessage: null,
  isLoading: false,
};

export function AuthReducer(
  state: AuthState = initialState,
  action: AuthActions
) {
  switch (action.type) {
    case AuthActionTypes.LOGIN:
      return { ...state, isLoading: true };
    case AuthActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        token: action.payload,
        isAuthenticated: true,
      };
    case AuthActionTypes.LOGIN_FAILURE:
      return { ...state, isLoading: false, errorMessage: action.payload };
    case AuthActionTypes.LOAD_CURRENT_USER:
      return { ...state, isLoading: true };
    case AuthActionTypes.LOAD_CURRENT_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload,
        errorMessage: null,
      };
    case AuthActionTypes.LOAD_CURRENT_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        user: null,
      };
    case AuthActionTypes.LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        token: null,
      };
    case AuthActionTypes.LOGOUT_FAILURE:
      return {
        ...state,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
}
