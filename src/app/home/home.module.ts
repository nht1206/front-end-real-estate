import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

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
import { UserInformationComponent } from './components/user-information/user-information.component';
import { SupportRequestComponent } from './components/support-request/support-request.component';

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
  ],
  imports: [CommonModule, HomeRoutingModule, ReactiveFormsModule],
})
export class HomeModule {}
