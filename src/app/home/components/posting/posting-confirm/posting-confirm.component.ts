import { async } from '@angular/core/testing';
import { tap } from 'rxjs/operators/';
import { AddPostAction } from './../../../../actions/post.actions';
import { PostImage } from './../../../../models/post-image';
import { finalize } from 'rxjs/operators';
import { FirebaseStorageService } from './../../../../services/firebase-storage.service';
import { Router } from '@angular/router';
import { AppState } from 'src/app/models/app-state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-posting-confirm',
  templateUrl: './posting-confirm.component.html',
  styleUrls: ['./posting-confirm.component.css'],
})
export class PostingConfirmComponent implements OnInit {
  currentPostingPost$: Observable<Post>;
  currentPostingPost: Post;
  listPercentages: Observable<number>[] = [];
  isPosting = false;
  imageUrls$: Observable<string[]>;
  postImages: PostImage[] = [];
  constructor(
    private store: Store<AppState>,
    private router: Router,
    private firebaseService: FirebaseStorageService
  ) {
    this.currentPostingPost$ = store.select(
      (app) => app.post.currentPostingPost
    );
  }

  ngOnInit(): void {
    this.store
      .select((app) => app.post.isPosting)
      .subscribe((isPosting) => {
        if (!isPosting) {
          this.router.navigateByUrl('/');
        }
      });
    this.imageUrls$ = this.store.select((app) => app.post.imageUrls);
    this.currentPostingPost$.subscribe((post) => {
      this.currentPostingPost = post;
    });
  }

  post(): void {
    this.isPosting = true;
    this.imageUrls$.subscribe((imageUrls) => {
      imageUrls.forEach((url) => {
        const { fileRef, uploadTask } = this.firebaseService.uploadFile(url);
        this.listPercentages.push(uploadTask.percentageChanges());
        uploadTask
          .snapshotChanges()
          .pipe(
            tap(),
            finalize(async () => {
              const postImageUrl = await fileRef.getDownloadURL().toPromise();
              const postImage: PostImage = {
                image: postImageUrl,
              };
              this.postImages.push(postImage);
              if (this.postImages.length === imageUrls.length) {
                this.currentPostingPost = {
                  ...this.currentPostingPost,
                  postImages: this.postImages,
                };
                this.store.dispatch(new AddPostAction(this.currentPostingPost));
              }
            })
          )
          .subscribe();
      });
    });
  }
}
