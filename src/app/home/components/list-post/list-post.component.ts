import { LoadCategoryAction } from './../../../actions/category.action';
import { Category } from './../../../models/category';
import { LoadRegionAction } from './../../../actions/region.action';
import { Region } from './../../../models/region';
import { PagerService } from './../../../services/pager.service';
import { SearchAllPostAction } from './../../../actions/post.action';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from 'src/app/models/page';
import { Post } from 'src/app/models/post';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/app-state';
import { Search } from 'src/app/models/search';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.css'],
})
export class ListPostComponent implements OnInit {
  posts$: Observable<Page<Post>>;
  regions$: Observable<Array<Region>>;
  categories$: Observable<Array<Category>>;
  loading$: Observable<boolean>;
  error$: Observable<Error>;
  currentOption$: Observable<Search>;
  pager: any;
  searchForm: FormGroup;
  constructor(
    private store: Store<AppState>,
    private pagerService: PagerService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.posts$ = this.store.select((store) => store.post.list);
    this.loading$ = this.store.select((store) => store.post.loading);
    this.error$ = this.store.select((store) => store.post.error);
    this.regions$ = this.store.select((store) => store.region.list);
    this.categories$ = this.store.select((store) => store.category.list);
    this.currentOption$ = this.store.select(
      (store) => store.post.currentOption
    );
    this.searchForm = this.formBuilder.group({
      keyword: [''],
      regionId: [null],
      categoryId: [null],
    });
    this.jumpToPage(1);
    this.store.dispatch(new LoadRegionAction());
    this.store.dispatch(new LoadCategoryAction());
  }

  handleSearch() {
    const option: Search = new Search();
    option.keyword = this.searchForm.value.keyword;
    option.regionId = this.searchForm.value.regionId;
    option.categoryId = this.searchForm.value.categoryId;
    this.store.dispatch(new SearchAllPostAction(option, 0));
  }

  jumpToPage(page: number): void {
    this.currentOption$.subscribe((option) => {
      this.store.dispatch(new SearchAllPostAction(option, page - 1));
    });
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
}
