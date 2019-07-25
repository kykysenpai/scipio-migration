import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {NavbarComponent} from './navbar/navbar.component';
import {CommunistSplitComponent} from './communist-split/communist-split.component';
import {BdoComponent} from './bdo/bdo.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {KeycloakService} from "./keycloak/keycloak.service";
import {KeycloakInterceptor} from "./keycloak/keycloak.interceptor";
import {MonstersComponent} from './bdo/monsters/monsters.component';
import {HuntsComponent} from './bdo/hunts/hunts.component';
import {SummaryComponent} from './bdo/summary/summary.component';
import {ReactiveFormsModule} from "@angular/forms";

export function initializeKeycloak(keycloak: KeycloakService) {
  return () => keycloak.initialize();
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CommunistSplitComponent,
    BdoComponent,
    MonstersComponent,
    HuntsComponent,
    SummaryComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
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
export class AppModule {
}
