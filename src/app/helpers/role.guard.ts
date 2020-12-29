import { AuthService } from 'src/app/services/auth.service';
import { map, tap } from 'rxjs/operators/';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { RoleName } from '../models/role-name';
import { take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.authService.loadCurrentUser().pipe(
      take(1),
      map((user) => {
        if (user) {
          if (!this.hasRoles(user, route.data.role)) {
            return this.router.createUrlTree(['/']);
          }
          return true;
        } else {
          return this.router.createUrlTree(['login']);
        }
      })
    );
  }
  private hasRoles(user, roleName: RoleName): boolean {
    let result = false;
    user.roles.forEach((userRole) => {
      if (userRole.roleName === roleName) {
        result = true;
      }
    });
    return result;
  }
}
