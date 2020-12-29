import { AnonymousGuard } from './../helpers/anonymous.guard';
import { RoleGuard } from './../helpers/role.guard';
import { AuthGuard } from './../helpers/auth.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AdvancedSearchComponent } from './components/advanced-search/advanced-search.component';
import { SearchByKeywordComponent } from './components/search-by-keyword/search-by-keyword.component';
import { SearchByAgeComponent } from './components/search-by-age/search-by-age.component';
import { ListPostComponent } from './components/list-post/list-post.component';
import { PostingFormComponent } from './components/posting/posting-form/posting-form.component';
import { PostingConfirmComponent } from './components/posting/posting-confirm/posting-confirm.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { LoadingComponent } from './components/loading/loading.component';
import { SupportRequestComponent } from './components/support-request/support-request.component';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { UserInformationComponent } from './components/user/user-information/user-information.component';
import { UserComponent } from './components/user/user.component';
import { UserPostListComponent } from './components/user/user-post-list/user-post-list.component';
import { UserEditFormComponent } from './components/user/user-edit-form/user-edit-form.component';

@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    RegistrationComponent,
    NavbarComponent,
    AdvancedSearchComponent,
    SearchByKeywordComponent,
    SearchByAgeComponent,
    ListPostComponent,
    PostingFormComponent,
    PostingConfirmComponent,
    PostDetailComponent,
    LoadingComponent,
    UserInformationComponent,
    SupportRequestComponent,
    UserComponent,
    UserPostListComponent,
    UserEditFormComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    NgbProgressbarModule,
    FormsModule,
  ],
  providers: [AuthGuard, RoleGuard, AnonymousGuard],
})
export class HomeModule {}
