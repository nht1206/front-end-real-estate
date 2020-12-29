import { mergeMap, map, catchError } from 'rxjs/operators/';
import {
  CreateSupportAction,
  CreateSupportFailureAction,
  CreateSupportSuccessAction,
  LoadSupportAction,
  LoadSupportFailureAction,
  LoadSupportSuccessAction,
  SupportActionTypes,
} from './../actions/support.actions';
import { SupportService } from './../services/support.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable()
export class SupportEffects {
  constructor(
    private actions$: Actions,
    private supportService: SupportService
  ) {}
  @Effect() loadSupport$ = this.actions$.pipe(
    ofType<LoadSupportAction>(SupportActionTypes.LOAD_SUPPORT),
    mergeMap(() =>
      this.supportService.getSupports().pipe(
        map((support) => new LoadSupportSuccessAction(support)),
        catchError((err) => of(new LoadSupportFailureAction(err.error.message)))
      )
    )
  );

  @Effect() createSupport$ = this.actions$.pipe(
    ofType<CreateSupportAction>(SupportActionTypes.CREATE_SUPPORT),
    mergeMap((action) =>
      this.supportService.createSupport(action.payload).pipe(
        map((support) => new CreateSupportSuccessAction(support)),
        catchError((err) =>
          of(new CreateSupportFailureAction(err.error.message))
        )
      )
    )
  );
}
