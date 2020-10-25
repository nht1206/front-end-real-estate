import { mergeMap, map, catchError } from 'rxjs/operators/';
import {
  LoadRegionAction,
  LoadRegionFailureAction,
  LoadRegionSuccessAction,
  RegionActionTypes,
} from './../actions/region.action';
import { RegionService } from './../services/region.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable()
export class RegionEffects {
  constructor(
    private actions$: Actions,
    private regionService: RegionService
  ) {}
  @Effect() loadRegion$ = this.actions$.pipe(
    ofType<LoadRegionAction>(RegionActionTypes.LOAD_REGION),
    mergeMap(() =>
      this.regionService.getRegions().pipe(
        map((regions) => new LoadRegionSuccessAction(regions)),
        catchError((err) => of(new LoadRegionFailureAction(err)))
      )
    )
  );
}
