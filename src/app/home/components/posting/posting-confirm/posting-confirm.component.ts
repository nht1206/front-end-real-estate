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
  constructor(private store: Store<AppState>, private router: Router) {
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
  }
}
