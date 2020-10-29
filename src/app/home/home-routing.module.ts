import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { ListPostComponent } from './components/list-post/list-post.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostingFormComponent } from './components/posting/posting-form/posting-form.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', component: ListPostComponent },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegistrationComponent,
      },
      {
        path: 'posting',
        component: PostingFormComponent,
      },
      {
        path: 'post-detail/:id',
        component: PostDetailComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
