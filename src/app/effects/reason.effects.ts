import { mergeMap, map, catchError } from 'rxjs/operators/';
import {
  LoadReasonAction,
  LoadReasonFailureAction,
  LoadReasonSuccessAction,
  ReasonActionTypes,
} from './../actions/reason.actions';
import { ReasonService } from './../services/reason.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable()
export class ReasonEffects {
  constructor(
    private actions$: Actions,
    private reasonService: ReasonService
  ) {}
  @Effect() loadReason$ = this.actions$.pipe(
    ofType<LoadReasonAction>(ReasonActionTypes.LOAD_REASON),
    mergeMap(() =>
      this.reasonService.getReasons().pipe(
        map((reasons) => new LoadReasonSuccessAction(reasons)),
        catchError((err) => of(new LoadReasonFailureAction(err.error.message)))
      )
    )
  );
}
