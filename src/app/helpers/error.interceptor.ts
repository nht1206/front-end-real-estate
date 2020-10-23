import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators/';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, of, EMPTY, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private authService: AuthService) {}

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    if (err.status === 401 || err.status === 403) {
      this.authService.logout();
      this.router.navigateByUrl('login');
      return of(EMPTY);
    }
    return throwError(err.error.message);
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next
      .handle(request)
      .pipe(catchError((response: any) => this.handleAuthError(response)));
  }
}
