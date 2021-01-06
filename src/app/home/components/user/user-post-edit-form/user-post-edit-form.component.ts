import { UpdatePostAction } from './../../../../actions/post.actions';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LoadCategoryAction } from 'src/app/actions/category.actions';
import { LoadDirectionAction } from 'src/app/actions/direction.actions';
import { LoadPostTypeAction } from 'src/app/actions/post-type.actions';
import { GetPostById } from 'src/app/actions/post.actions';
import { LoadRegionAction } from 'src/app/actions/region.actions';
import { AppState } from 'src/app/models/app-state';
import { Category } from 'src/app/models/category';
import { Direction } from 'src/app/models/direction';
import { Post } from 'src/app/models/post';
import { PostType } from 'src/app/models/post-type';
import { Region } from 'src/app/models/region';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user-post-edit-form',
  templateUrl: './user-post-edit-form.component.html',
  styleUrls: ['./user-post-edit-form.component.css'],
})
export class UserPostEditFormComponent implements OnInit {
  editForm: FormGroup;
  user$: Observable<User>;
  postTypes$: Observable<Array<PostType>>;
  regions$: Observable<Array<Region>>;
  categories$: Observable<Array<Category>>;
  direction$: Observable<Array<Direction>>;
  currentPost$: Observable<Post>;
  errorMessage$: Observable<Error>;
  imageUrls: string[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.currentPost$ = store.select((app) => app.post.currentPost);
    this.user$ = store.select((app) => app.auth.user);
    this.regions$ = store.select((app) => app.region.list);
    this.categories$ = store.select((app) => app.category.list);
    this.direction$ = store.select((app) => app.direction.list);
    this.postTypes$ = store.select((app) => app.postType.list);
    this.errorMessage$ = store.select((app) => app.post.error);
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((route) => {
      if (route.id) {
        this.store.dispatch(new GetPostById(route.id));
      }
    });
    this.store.dispatch(new LoadRegionAction());
    this.store.dispatch(new LoadCategoryAction());
    this.store.dispatch(new LoadDirectionAction());
    this.store.dispatch(new LoadPostTypeAction());
    this.editForm = this.formBuilder.group({
      id: [],
      title: ['', [Validators.required, Validators.maxLength(50)]],
      condition: [true],
      address: ['', [Validators.required, Validators.maxLength(100)]],
      region: this.formBuilder.group({
        id: [],
      }),
      area: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]+(,)?[0-9]+$'),
          Validators.min(0),
        ],
      ],
      price: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]+$'),
          Validators.min(0),
        ],
      ],
      deal: [false],
      content: ['', [Validators.required, Validators.maxLength(65535)]],
      user: [],
      category: this.formBuilder.group({
        id: [],
      }),
      postType: this.formBuilder.group({
        id: [],
      }),
      direction: this.formBuilder.group({
        id: [],
      }),
      userType: [true],
      postImages: [[]],
    });
    this.currentPost$.subscribe((post) => {
      if (post) {
        this.editForm.patchValue(post);
        this.imageUrls = [
          ...post.postImages.map((postImage) => postImage.image),
        ];
      }
    });
    this.user$.subscribe((user) => {
      if (user) {
        this.editForm.patchValue({
          user,
        });
      }
    });
  }
  submitForm(): void {
    if (this.editForm.valid) {
      this.store.dispatch(
        new UpdatePostAction(this.editForm.value.id, this.editForm.value)
      );
    }
  }

  fileChange(e): void {
    if (e.target.files && e.target.files[0]) {
      let filesAmount = e.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        let reader = new FileReader();
        reader.onload = (event: any) => {
          this.imageUrls.push(event.target.result);
        };
        reader.readAsDataURL(e.target.files[i]);
      }
    }
  }

  removeImage(index) {
    this.imageUrls.splice(index, 1);
  }

  get form(): FormGroup {
    return this.editForm;
  }
}
