import { UserPostEditFormComponent } from './components/user/user-post-edit-form/user-post-edit-form.component';
import { AnonymousGuard } from '../helpers/anonymous.guard';
import { RoleGuard } from './../helpers/role.guard';
import { RoleName } from './../models/role-name';
import { AuthGuard } from './../helpers/auth.guard';
import { UserEditFormComponent } from './components/user/user-edit-form/user-edit-form.component';
import { UserComponent } from './components/user/user.component';
import { SupportRequestComponent } from './components/support-request/support-request.component';
import { PostingConfirmComponent } from './components/posting/posting-confirm/posting-confirm.component';
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
        canActivate: [AnonymousGuard],
      },
      {
        path: 'register',
        component: RegistrationComponent,
        canActivate: [AnonymousGuard],
      },
      {
        path: 'posting',
        component: PostingFormComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { role: 'ROLE_USER' as RoleName },
      },
      {
        path: 'confirm',
        component: PostingConfirmComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { role: 'ROLE_USER' as RoleName },
      },
      {
        path: 'post-detail/:id',
        component: PostDetailComponent,
      },
      {
        path: 'user',
        component: UserComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { role: 'ROLE_USER' as RoleName },
      },
      {
        path: 'user/post/:id',
        component: PostDetailComponent,
      },
      {
        path: 'user/post/:id/edit',
        component: UserPostEditFormComponent,
      },
      {
        path: 'support-request',
        component: SupportRequestComponent,
      },
      {
        path: 'user/edit',
        component: UserEditFormComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { role: 'ROLE_USER' as RoleName },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
