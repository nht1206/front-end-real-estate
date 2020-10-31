import { mergeMap, map, catchError } from 'rxjs/operators/';
import {
  LoadDirectionAction,
  LoadDirectionFailureAction,
  LoadDirectionSuccessAction,
  DirectionActionTypes,
} from './../actions/direction.action';
import { DirectionService } from './../services/direction.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable()
export class DirectionEffects {
  constructor(
    private actions$: Actions,
    private directionService: DirectionService
  ) {}
  @Effect() loadDirection$ = this.actions$.pipe(
    ofType<LoadDirectionAction>(DirectionActionTypes.LOAD_DIRECTION),
    mergeMap(() =>
      this.directionService.getDirections().pipe(
        map((directions) => new LoadDirectionSuccessAction(directions)),
        catchError((err) =>
          of(new LoadDirectionFailureAction(err.error.message))
        )
      )
    )
  );
}
