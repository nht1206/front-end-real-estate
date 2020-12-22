import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppState } from 'src/app/models/app-state';
import { Login } from 'src/app/actions/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isAuthenticated$: Observable<boolean>;
  loading$: Observable<boolean>;
  errorMessage$: Observable<string>;
  successMessage$: Observable<string>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.isAuthenticated$ = store.select((app) => app.auth.isAuthenticated);
    this.errorMessage$ = store.select((app) => app.auth.errorMessage);
    this.successMessage$ = store.select((app) => app.auth.successMessage);
    this.loading$ = store.select((app) => app.auth.isLoading);
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
    this.isAuthenticated$.subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.router.navigateByUrl('/');
      }
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }
    this.store.dispatch(new Login(this.loginForm.value));
  }

  get form() {
    return this.loginForm.controls;
  }
}
