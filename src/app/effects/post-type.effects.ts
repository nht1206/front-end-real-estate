import { mergeMap, map, catchError } from 'rxjs/operators/';
import {
  LoadPostTypeAction,
  LoadPostTypeFailureAction,
  LoadPostTypeSuccessAction,
  PostTypeActionTypes,
} from './../actions/post-type.action';
import { PostTypeService } from './../services/post-type.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable()
export class PostTypeEffects {
  constructor(
    private actions$: Actions,
    private regionService: PostTypeService
  ) {}
  @Effect() loadPostType$ = this.actions$.pipe(
    ofType<LoadPostTypeAction>(PostTypeActionTypes.LOAD_POST_TYPE),
    mergeMap(() =>
      this.regionService.getPostTypes().pipe(
        map((postTypes) => new LoadPostTypeSuccessAction(postTypes)),
        catchError((err) =>
          of(new LoadPostTypeFailureAction(err.error.message))
        )
      )
    )
  );
}
