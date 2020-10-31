import {
  GetPostById,
  GetPostByIdSuccess,
  GetPostByIdFailure,
  UpdatePostViewCount,
} from './../actions/post.action';
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
  constructor(private actions$: Actions, private postService: PostService) {}
  @Effect() loadPost$ = this.actions$.pipe(
    ofType<LoadPostAction>(PostActionTypes.LOAD_POST),
    mergeMap((action) =>
      this.postService.getPosts(action.payload).pipe(
        map((posts) => new LoadPostSuccessAction(posts)),
        catchError((err) => of(new LoadPostFailureAction(err.error.message)))
      )
    )
  );

  @Effect() addPost$ = this.actions$.pipe(
    ofType<AddPostAction>(PostActionTypes.ADD_POST),
    mergeMap((action) =>
      this.postService.addPost(action.payload).pipe(
        map(() => new LoadPostAction(0)),
        catchError((err) => of(new AddPostFailureAction(err.error.message)))
      )
    )
  );
  @Effect() deletePost$ = this.actions$.pipe(
    ofType<DeletePostAction>(PostActionTypes.DELETE_POST),
    mergeMap((action) =>
      this.postService.deletePost(action.payload).pipe(
        map(() => new LoadPostAction(0)),
        catchError((err) => of(new DeletePostFailureAction(err.error.message)))
      )
    )
  );

  @Effect() searchAllPost$ = this.actions$.pipe(
    ofType<SearchAllPostAction>(PostActionTypes.SEARCH_ALL_POST),
    mergeMap((action) =>
      this.postService.searchAll(action.payload, action.page).pipe(
        map((posts) => new SearchAllPostSuccessAction(posts)),
        catchError((err) =>
          of(new SearchAllPostFailureAction(err.error.message))
        )
      )
    )
  );

  @Effect() getPostById$ = this.actions$.pipe(
    ofType<GetPostById>(PostActionTypes.GET_POST_BY_ID),
    mergeMap((action) =>
      this.postService.getPostById(parseInt(action.payload, 10)).pipe(
        map((post) => new GetPostByIdSuccess(post)),
        catchError((err) => of(new GetPostByIdFailure(err.error.message)))
      )
    )
  );

  @Effect() updatePostViewCount$ = this.actions$.pipe(
    ofType<UpdatePostViewCount>(PostActionTypes.UPDATE_POST_VIEW_COUNT),
    mergeMap((action) =>
      this.postService
        .updatePostViewCount(parseInt(action.payload, 10))
        .pipe(map(() => new GetPostById(action.payload)))
    )
  );
}
