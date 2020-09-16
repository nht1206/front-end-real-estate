import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private storageService: StorageService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    let isActivated = false;
    const user = this.storageService.getUser();
    if (user) {
      user.roles.forEach((role) => {
        if (route.data.roles.includes(role.roleName)) {
          isActivated = true;
        }
      });
    }
    if (!isActivated) {
      this.router.navigateByUrl('admin/login');
    }
    return isActivated;
  }
}
