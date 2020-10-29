import { StorageService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
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
  isSuccessful = false;
  isSignUpFailed = false;
  message = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.isAuthenticated$ = store.select((app) => app.auth.isAuthenticated);
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
    this.authService.register(this.registerForm.value).subscribe(
      (data) => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.message = data.message;
        setTimeout(() => {
          this.router.navigateByUrl('/login');
        }, 3000);
      },
      (err) => {
        console.log(err);
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

  get form() {
    return this.registerForm.controls;
  }
}
