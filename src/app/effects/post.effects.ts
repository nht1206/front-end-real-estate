import { PostService } from '../services/post.service';
import {
  PostActionTypes,
  LoadPostSuccessAction,
  LoadPostFailureAction,
  LoadPostAction,
  AddPostAction,
  AddPostFailureAction,
  DeletePostAction,
  DeletePostFailureAction,
  SearchAllPostAction,
  SearchAllPostFailureAction,
  SearchAllPostSuccessAction,
} from '../actions/post.action';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators/';
import { of } from 'rxjs';
@Injectable()
export class PostEffects {
  @Effect() loadPost$ = this.actions$.pipe(
    ofType<LoadPostAction>(PostActionTypes.LOAD_POST),
    mergeMap((data) =>
      this.postService.getPosts(data.payload).pipe(
        map((posts) => new LoadPostSuccessAction(posts)),
        catchError((err) => of(new LoadPostFailureAction(err)))
      )
    )
  );

  @Effect() addPost$ = this.actions$.pipe(
    ofType<AddPostAction>(PostActionTypes.ADD_POST),
    mergeMap((data) =>
      this.postService.addPost(data.payload).pipe(
        map(() => new LoadPostAction(0)),
        catchError((err) => of(new AddPostFailureAction(err)))
      )
    )
  );
  @Effect() deletePost$ = this.actions$.pipe(
    ofType<DeletePostAction>(PostActionTypes.DELETE_POST),
    mergeMap((data) =>
      this.postService.deletePost(data.payload).pipe(
        map(() => new LoadPostAction(0)),
        catchError((err) => of(new DeletePostFailureAction(err)))
      )
    )
  );

  @Effect() searchAllPost$ = this.actions$.pipe(
    ofType<SearchAllPostAction>(PostActionTypes.SEARCH_ALL_POST),
    mergeMap((data) =>
      this.postService.searchAll(data.payload, data.page).pipe(
        map((posts) => new SearchAllPostSuccessAction(posts)),
        catchError((err) => of(new SearchAllPostFailureAction(err)))
      )
    )
  );
  constructor(private actions$: Actions, private postService: PostService) {}
}
