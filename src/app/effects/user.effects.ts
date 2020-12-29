import { Router } from '@angular/router';
import { UserService } from './../services/user.service';
import { mergeMap, map, catchError, tap } from 'rxjs/operators/';
import {
  UserActionTypes,
  UpdateUserInformation,
  UpdateUserInformationSuccess,
  UpdateUserInformationFailure,
  ChangeUserPassword,
  ChangeUserPasswordSuccess,
  ChangeUserPasswordFailure,
  GetUserPosts,
  GetUserPostsSuccess,
  GetUserPostsFailure,
} from './../actions/user.actions';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable()
export class UserEffects {
  constructor(
    private actions: Actions,
    private userService: UserService,
    private router: Router
  ) {}
  @Effect() updateUserInformation$ = this.actions.pipe(
    ofType<UpdateUserInformation>(UserActionTypes.UPDATE_USER_INFORMATION),
    mergeMap((action) =>
      this.userService.updateUser(action.payload).pipe(
        map((user) => new UpdateUserInformationSuccess(user)),
        catchError((err) =>
          of(new UpdateUserInformationFailure(err.error.message))
        )
      )
    )
  );

  @Effect({ dispatch: false })
  updateUserInformationSuccess$ = this.actions.pipe(
    ofType<UpdateUserInformationSuccess>(
      UserActionTypes.UPDATE_USER_INFORMATION_SUCCESS
    ),
    tap(() => {
      this.router.navigateByUrl('user');
    })
  );

  @Effect() changeUserPassword$ = this.actions.pipe(
    ofType<ChangeUserPassword>(UserActionTypes.CHANGE_USER_PASSWORD),
    mergeMap((action) =>
      this.userService.changePassword(action.payload).pipe(
        map(() => new ChangeUserPasswordSuccess()),
        catchError((err) =>
          of(new ChangeUserPasswordFailure(err.error.message))
        )
      )
    )
  );

  @Effect({ dispatch: false })
  changeUserPasswordSuccess$ = this.actions.pipe(
    ofType<ChangeUserPasswordSuccess>(
      UserActionTypes.CHANGE_USER_PASSWORD_SUCCESS
    ),
    tap(() => {
      this.router.navigateByUrl('user');
    })
  );

  @Effect() getUserPosts$ = this.actions.pipe(
    ofType<GetUserPosts>(UserActionTypes.GET_USER_POSTS),
    mergeMap((action) =>
      this.userService
        .getUserPosts(action.payload.page, action.payload.search)
        .pipe(
          map((posts) => new GetUserPostsSuccess(posts)),
          catchError((err) => of(new GetUserPostsFailure(err.error.message)))
        )
    )
  );
}
