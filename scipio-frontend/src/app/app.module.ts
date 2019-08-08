import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavbarComponent} from './navbar/navbar.component';
import {CommunistSplitComponent} from './communist-split/communist-split.component';
import {BdoComponent} from './bdo/bdo.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {KeycloakService} from "./keycloak/keycloak.service";
import {KeycloakInterceptor} from "./http-interceptor/keycloak.interceptor";
import {MonstersComponent} from './bdo/monsters/monsters.component';
import {HuntsComponent} from './bdo/hunts/hunts.component';
import {SummaryComponent} from './bdo/summary/summary.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxSpinnerModule} from "ngx-spinner";
import {SpinnerInterceptor} from "./http-interceptor/spinner.interceptor";
import {ErrorInterceptor} from "./http-interceptor/error.interceptor";
import {MDBBootstrapModule} from "angular-bootstrap-md";
import {DateInterceptor} from "./http-interceptor/date.interceptor";
import {AdminComponent} from './admin/admin.component';
import {AdminCommunistSplitComponent} from './admin/admin-communist-split/admin-communist-split.component';
import {AdminBotComponent} from './admin/admin-bot/admin-bot.component';
import {AdminUsersComponent} from './admin/admin-users/admin-users.component';
import {AdminSplitGroupDetailsModalComponent} from './admin/admin-split-group-details-modal/admin-split-group-details-modal.component';
import { PaymentsComponent } from './communist-split/payments/payments.component';
import { NewPaymentModalComponent } from './communist-split/new-payment-modal/new-payment-modal.component';
import { PaymentDetailsModalComponent } from './communist-split/payment-details-modal/payment-details-modal.component';
import { PaymentDetailsComponent } from './communist-split/payment-details/payment-details.component';
import { UsersComponent } from './users/users.component';
import { FooterStepsComponent } from './modal/footer-steps/footer-steps.component';
import { SelectedUserPipe } from './communist-split/selected-user.pipe';
import { SearchUserPipe } from './communist-split/search-user.pipe';
import { CalculateCreditChangePipe } from './communist-split/calculate-credit-change.pipe';

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
    SummaryComponent,
    AdminComponent,
    AdminCommunistSplitComponent,
    AdminBotComponent,
    AdminUsersComponent,
    AdminSplitGroupDetailsModalComponent,
    PaymentsComponent,
    NewPaymentModalComponent,
    PaymentDetailsModalComponent,
    PaymentDetailsComponent,
    UsersComponent,
    FooterStepsComponent,
    SelectedUserPipe,
    SearchUserPipe,
    CalculateCreditChangePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    MDBBootstrapModule.forRoot(),
    FormsModule
  ],
  entryComponents: [
    AdminSplitGroupDetailsModalComponent,
    NewPaymentModalComponent,
    PaymentDetailsModalComponent
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
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: DateInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
