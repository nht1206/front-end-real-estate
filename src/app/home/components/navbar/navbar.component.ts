import { Logout } from './../../../actions/auth.actions';
import { AppState } from 'src/app/models/app-state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { RoleName } from 'src/app/models/role-name';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LoadCurrentUser } from 'src/app/actions/auth.actions';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  user: User;
  user$: Observable<User>;
  isAuthenticated$: Observable<boolean>;

  constructor(
    private router: Router,
    private authService: AuthService,
    private store: Store<AppState>
  ) {
    this.user$ = store.select((app) => app.auth.user);
    this.isAuthenticated$ = store.select((app) => app.auth.isAuthenticated);
  }

  ngOnInit(): void {
    this.isAuthenticated$.subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.store.dispatch(new LoadCurrentUser());
      }
    });
    this.user$.subscribe(
      (user) => {
        this.user = user;
      },
      (err) => {
        location.assign('/error');
      }
    );
  }

  isAdmin(): boolean {
    return this.hasRole(RoleName.ADMIN);
  }

  isMod(): boolean {
    return this.hasRole(RoleName.MOD);
  }

  logout(): void {
    this.store.dispatch(new Logout());
    this.router.navigateByUrl('login');
  }

  private hasRole(roleName: RoleName): boolean {
    let result = false;
    this.user$.subscribe((user) => {
      if (user) {
        user.roles.forEach((userRole) => {
          if (userRole.roleName === roleName) {
            result = true;
          }
        });
      }
    });
    return result;
  }
}
