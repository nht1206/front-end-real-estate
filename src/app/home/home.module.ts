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
  ],
  imports: [CommonModule, HomeRoutingModule, ReactiveFormsModule],
})
export class HomeModule {}
