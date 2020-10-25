import { mergeMap, map, catchError } from 'rxjs/operators/';
import {
  LoadCategoryAction,
  LoadCategoryFailureAction,
  LoadCategorySuccessAction,
  CategoryActionTypes,
} from './../actions/category.action';
import { CategoryService } from './../services/category.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable()
export class CategoryEffects {
  constructor(
    private actions$: Actions,
    private categoryService: CategoryService
  ) {}
  @Effect() loadCategory$ = this.actions$.pipe(
    ofType<LoadCategoryAction>(CategoryActionTypes.LOAD_CATEGORY),
    mergeMap(() =>
      this.categoryService.getCategories().pipe(
        map((categories) => new LoadCategorySuccessAction(categories)),
        catchError((err) => of(new LoadCategoryFailureAction(err)))
      )
    )
  );
}
