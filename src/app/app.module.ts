import { PostTypeEffects } from './effects/post-type.effects';
import { DirectionEffects } from './effects/direction.effects';
import { CategoryEffects } from './effects/category.effects';
import { RegionEffects } from './effects/region.effects';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { TokenInterceptor } from './helpers/token.interceptor';
import { reducers } from './reducers/index';
import { PostEffects } from './effects/post.effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AuthEffects } from './effects/auth.effects';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { AdvancedSearchComponent } from './home/components/advanced-search/advanced-search.component';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [AdvancedSearchComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    EffectsModule.forRoot([
      PostEffects,
      AuthEffects,
      RegionEffects,
      CategoryEffects,
      DirectionEffects,
      PostTypeEffects,
    ]),
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    NgbModalModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
