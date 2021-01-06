import { DeletePostAction } from './../../../../actions/post.actions';
import { PagerService } from './../../../../services/pager.service';
import { GetUserPosts } from './../../../../actions/user.actions';
import { Store } from '@ngrx/store';
import { Page } from './../../../../models/page';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';
import { AppState } from 'src/app/models/app-state';

@Component({
  selector: 'app-user-post-list',
  templateUrl: './user-post-list.component.html',
  styleUrls: ['./user-post-list.component.css'],
})
export class UserPostListComponent implements OnInit {
  posts$: Observable<Page<Post>>;
  post: Post;
  search = '';
  page = 0;
  pager: any;
  isLoading$: Observable<boolean>;

  constructor(
    private modalService: NgbModal,
    private store: Store<AppState>,
    private pagerService: PagerService
  ) {
    this.posts$ = store.select((app) => app.user.posts);
    this.isLoading$ = store.select((app) => app.user.isLoading);
  }

  ngOnInit(): void {
    this.searchHandler();
    this.posts$.subscribe((posts) => {
      if (posts) {
        this.pager = this.pagerService.getPager(
          posts.totalElements,
          posts.number + 1,
          posts.size
        );
      }
    });
  }

  searchHandler(): void {
    this.store.dispatch(
      new GetUserPosts({ page: this.page, search: this.search })
    );
  }

  jumpToPage(page: number): void {
    this.store.dispatch(
      new GetUserPosts({ page: page - 1, search: this.search })
    );
  }

  deletePost(postId: string): void {
    this.store.dispatch(new DeletePostAction(postId));
    this.jumpToPage(this.page);
    this.modalService.dismissAll();
  }

  openModal(targetModal, post) {
    this.modalService.open(targetModal);
    this.post = post;
  }
}
