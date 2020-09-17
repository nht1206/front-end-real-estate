import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { StorageService } from './../../../services/storage.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppState } from 'src/app/models/app-state';
import { Login, LoadCurrentUser } from 'src/app/actions/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isAuthenticated$: Observable<boolean>;
  errorMessage$: Observable<string>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.isAuthenticated$ = this.store.select(
      (app) => app.auth.isAuthenticated
    );
    this.errorMessage$ = this.store.select((app) => app.auth.errorMessage);
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
    this.isAuthenticated$.subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.router.navigateByUrl('/');
        this.store.dispatch(new LoadCurrentUser());
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
