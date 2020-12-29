import { finalize } from 'rxjs/operators/';
import { FirebaseStorageService } from './../../../../services/firebase-storage.service';
import {
  ChangeUserPassword,
  UpdateUserInformation,
} from './../../../../actions/user.actions';
import { LoadCurrentUser } from './../../../../actions/auth.actions';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { AppState } from 'src/app/models/app-state';

@Component({
  selector: 'app-user-edit-form',
  templateUrl: './user-edit-form.component.html',
  styleUrls: ['./user-edit-form.component.css'],
})
export class UserEditFormComponent implements OnInit {
  isSubmitted: boolean = false;
  infoEditForm: FormGroup;
  user$: Observable<User>;
  imageUrl = '';
  percentages$: Observable<number>;

  passwordEditForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private firebaseService: FirebaseStorageService
  ) {
    this.user$ = store.select((app) => app.auth.user);
    this.infoEditForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      address: ['', [Validators.required, Validators.maxLength(100)]],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern('^0[1-9]{2}[0-9]{7}$')],
      ],
      avatar: [null],
    });
    this.passwordEditForm = this.formBuilder.group(
      {
        currentPassword: ['', [Validators.required]],
        newPassword: [''],
        confirmNewPassword: [''],
      },
      { validators: this.checkPasswords }
    );
  }

  ngOnInit(): void {
    this.store.dispatch(new LoadCurrentUser());
    this.user$.subscribe((user) => {
      if (user) {
        this.infoEditForm.patchValue(user);
      }
    });
  }

  checkPasswords(group: FormGroup) {
    let pass = group.get('newPassword').value;
    let confirmPass = group.get('confirmNewPassword').value;
    return pass === confirmPass ? null : { notSame: true };
  }

  detectFile(event): void {
    const selectedFile = event.target.files[0];
    // Show image preview
    const reader = new FileReader();
    reader.onload = (data: any) => {
      this.imageUrl = data.target.result;
    };
    reader.readAsDataURL(selectedFile);
  }

  get editFormDirty(): boolean | string {
    return this.infoEditForm.dirty || this.imageUrl;
  }

  onSubmit(): void {
    if (this.infoEditForm.valid) {
      this.isSubmitted = true;
      if (this.imageUrl) {
        const { fileRef, uploadTask } = this.firebaseService.uploadFile(
          this.imageUrl
        );
        this.percentages$ = uploadTask.percentageChanges();
        uploadTask
          .snapshotChanges()
          .pipe(
            finalize(async () => {
              fileRef.getDownloadURL().subscribe((url) => {
                if (url) {
                  this.infoEditForm.patchValue({
                    avatar: url,
                  });
                  this.store.dispatch(
                    new UpdateUserInformation(this.infoEditForm.value)
                  );
                }
              });
            })
          )
          .subscribe();
      } else {
        this.store.dispatch(new UpdateUserInformation(this.infoEditForm.value));
      }
    }
  }

  changePassword(): void {
    if (this.passwordEditForm.valid) {
      this.isSubmitted = true;
      this.store.dispatch(new ChangeUserPassword(this.passwordEditForm.value));
    }
  }
}
