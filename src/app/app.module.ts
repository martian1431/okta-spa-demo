import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { OktaAuthModule, OKTA_CONFIG } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { AvatarModule } from 'ngx-avatar';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
// import { CarouselModule } from 'ngx-owl-carousel-o';
// import { CarouselHolderComponent } from './carousel-holder/carousel-holder.component';
// import { CarouselModule } from 'ngx-owl-carousel-o';
// import { MatCarouselModule } from '@ngbmodule/material-carousel';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatCarouselModule } from '@shared-services-wps/carousel';
import { MatMenuModule } from '@angular/material/menu';
import { HomeModule } from './home/home.module';
import { ProfileModule } from './profile/profile.module';

const oktaAuth = new OktaAuth({
  issuer: 'https://dev-47160365.okta.com/oauth2/default',
  clientId: '0oad8uvjq1a6saiCe5d7',
  redirectUri: 'http://localhost:4200/login/callback',
});

@NgModule({
  declarations: [AppComponent, LoginComponent],
  imports: [
    HomeModule,
    ProfileModule,
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    HttpClientModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatExpansionModule,
    AvatarModule,
    MatMenuModule,
    // CarouselModule,
    OktaAuthModule.forRoot({ oktaAuth }),
    CommonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
