import { Register } from './../../../actions/auth.actions';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/app-state';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  registerForm: FormGroup;
  isAuthenticated$: Observable<boolean>;
  loading$: Observable<boolean>;
  errorMessage$: Observable<string>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.isAuthenticated$ = store.select((app) => app.auth.isAuthenticated);
    this.errorMessage$ = store.select((app) => app.auth.errorMessage);
    this.loading$ = store.select((app) => app.auth.isLoading);
  }

  ngOnInit() {
    this.isAuthenticated$.subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.router.navigateByUrl('/');
      }
    });
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    this.store.dispatch(new Register(this.registerForm.value));
  }

  get form() {
    return this.registerForm.controls;
  }
}
