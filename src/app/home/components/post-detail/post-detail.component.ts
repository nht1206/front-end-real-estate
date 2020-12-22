import { Observable } from 'rxjs';
import { UpdatePostViewCount } from './../../../actions/post.action';
import { AppState } from './../../../models/app-state';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
})
export class PostDetailComponent implements OnInit {
  post$: Observable<Post>;
  loading$: Observable<boolean>;
  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>
  ) {
    this.post$ = store.select((app) => app.post.currentPost);
    this.loading$ = store.select((app) => app.post.loading);
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((route) => {
      if (route.id) {
        this.store.dispatch(new UpdatePostViewCount(route.id));
      }
    });
  }
}
