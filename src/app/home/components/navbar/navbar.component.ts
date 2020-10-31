import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Logout } from './../../../actions/auth.actions';
import { AppState } from 'src/app/models/app-state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { RoleName } from 'src/app/models/role-name';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';

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
    private store: Store<AppState>,
    private modalService: NgbModal
  ) {
    this.user$ = store.select((app) => app.auth.user);
    this.isAuthenticated$ = store.select((app) => app.auth.isAuthenticated);
  }

  ngOnInit(): void {
    this.user$.subscribe(
      (user) => {
        this.user = user;
      },
      (err) => {
        location.assign('/error');
      }
    );
  }

  goToPostingForm(content): void {
    if (this.user === null) {
      this.openModal(content);
    } else {
      this.router.navigateByUrl('/posting');
    }
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

  openModal(content): void {
    this.modalService.open(content);
  }
}
