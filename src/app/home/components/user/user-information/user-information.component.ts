import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LoadCurrentUser } from 'src/app/actions/auth.actions';
import { AppState } from 'src/app/models/app-state';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.css'],
})
export class UserInformationComponent implements OnInit {
  user$: Observable<User>;

  constructor(private store: Store<AppState>) {
    this.user$ = store.select((app) => app.auth.user);
  }

  ngOnInit(): void {
    this.store.dispatch(new LoadCurrentUser());
  }
}
