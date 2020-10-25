import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { mergeMap, map, catchError, switchMap, tap } from 'rxjs/operators/';
import {
  Login,
  AuthActionTypes,
  LoginSuccess,
  LoginFailure,
  LoadCurrentUser,
  LoadCurrentUserSuccess,
  LoadCurrentUserFailure,
  Logout,
} from './../actions/auth.actions';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';

@Injectable()
export class AuthEffects {
  @Effect() login$ = this.actions$.pipe(
    ofType<Login>(AuthActionTypes.LOGIN),
    switchMap((action) =>
      this.authService.login(action.payload).pipe(
        mergeMap((data) => [
          new LoginSuccess(data.token),
          new LoadCurrentUser(),
        ]),
        catchError((err) => of(new LoginFailure(err.error.message)))
      )
    )
  );

  @Effect() loadCurrentUser$ = this.actions$.pipe(
    ofType<LoadCurrentUser>(AuthActionTypes.LOAD_CURRENT_USER),
    switchMap(() =>
      this.authService.loadCurrentUser().pipe(
        map((user) => new LoadCurrentUserSuccess(user)),
        catchError((err) => of(new LoadCurrentUserFailure()))
      )
    )
  );

  @Effect({ dispatch: false }) logout$ = this.actions$.pipe(
    ofType<Logout>(AuthActionTypes.LOGOUT),
    tap(() => {
      this.authService.logout();
    })
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}
