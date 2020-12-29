import { map } from 'rxjs/operators/';
import { StorageService } from './../services/storage.service';
import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AnonymousGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
    private storageService: StorageService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.storageService.getToken() == null) {
      return true;
    }
    return this.authService.loadCurrentUser().pipe(
      take(1),
      map((user) => {
        if (user) {
          return this.router.createUrlTree(['/']);
        }
        return !user;
      })
    );
  }
}
