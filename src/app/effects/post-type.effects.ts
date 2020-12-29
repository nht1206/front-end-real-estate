import { mergeMap, map, catchError } from 'rxjs/operators/';
import {
  LoadPostTypeAction,
  LoadPostTypeFailureAction,
  LoadPostTypeSuccessAction,
  PostTypeActionTypes,
} from './../actions/post-type.actions';
import { PostTypeService } from './../services/post-type.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable()
export class PostTypeEffects {
  constructor(
    private actions$: Actions,
    private postTypeService: PostTypeService
  ) {}
  @Effect() loadPostType$ = this.actions$.pipe(
    ofType<LoadPostTypeAction>(PostTypeActionTypes.LOAD_POST_TYPE),
    mergeMap(() =>
      this.postTypeService.getPostTypes().pipe(
        map((postTypes) => new LoadPostTypeSuccessAction(postTypes)),
        catchError((err) =>
          of(new LoadPostTypeFailureAction(err.error.message))
        )
      )
    )
  );
}
