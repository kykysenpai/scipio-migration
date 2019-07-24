import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { NavbarComponent } from './navbar/navbar.component';
import { CommunistSplitComponent } from './communist-split/communist-split.component';
import { BdoComponent } from './bdo/bdo.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {KeycloakService} from "./keycloak/keycloak.service";
import {KeycloakInterceptor} from "./keycloak/keycloak.interceptor";

export function initializeKeycloak(keycloak: KeycloakService) {
  return () => keycloak.initialize();
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CommunistSplitComponent,
    BdoComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: KeycloakInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
