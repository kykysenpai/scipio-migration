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
import {PaymentsComponent} from './communist-split/payments/payments.component';
import {NewPaymentModalComponent} from './communist-split/new-payment-modal/new-payment-modal.component';
import {PaymentDetailsModalComponent} from './communist-split/payment-details-modal/payment-details-modal.component';
import {PaymentDetailsComponent} from './communist-split/payment-details/payment-details.component';
import {UsersComponent} from './users/users.component';
import {FooterStepsComponent} from './modal/footer-steps/footer-steps.component';
import {SelectedUserPipe} from './communist-split/selected-user.pipe';
import {SearchUserPipe} from './communist-split/search-user.pipe';
import {CalculateCreditChangePipe} from './communist-split/calculate-credit-change.pipe';
import {AmountLeftPipePipe} from './communist-split/amount-left-pipe.pipe';
import {TotalCreditPipe} from './communist-split/total-credit.pipe';
import {PaymentCreditComponent} from './communist-split/payment-credit/payment-credit.component';
import {PaymentsStatisticsComponent} from './communist-split/payments-statistics/payments-statistics.component';
import {InteractableDockerContainerComponent} from './docker/interactable-docker-container/interactable-docker-container.component';
import {ListDockerContainerComponent} from './docker/list-docker-container/list-docker-container.component';
import {ListSavedDockerContainerComponent} from './docker/list-saved-docker-container/list-saved-docker-container.component';
import {DetailsSavedDockerContainerComponent} from './docker/details-saved-docker-container/details-saved-docker-container.component';
import {DockerComponent} from './docker/docker/docker.component';
import {InjectableRxStompConfig, RxStompService, rxStompServiceFactory} from "@stomp/ng2-stompjs";
import {stompConfig} from "./websocket/stomp.config";
import {DetailsRunningDockerContainerComponent} from './docker/details-running-docker-container/details-running-docker-container.component';
import {LightboxModule} from "ngx-lightbox";
import {FooterComponent} from './footer/footer.component';
import { SubscriptionComponent } from './spotify/subscription/subscription.component';
import { SpotifyComponent } from './spotify/spotify.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { ReleaseComponent } from './spotify/release/release.component';

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
    CalculateCreditChangePipe,
    AmountLeftPipePipe,
    TotalCreditPipe,
    PaymentCreditComponent,
    PaymentsStatisticsComponent,
    InteractableDockerContainerComponent,
    ListDockerContainerComponent,
    ListSavedDockerContainerComponent,
    DetailsSavedDockerContainerComponent,
    DockerComponent,
    DetailsRunningDockerContainerComponent,
    FooterComponent,
    SubscriptionComponent,
    SpotifyComponent,
    ReleaseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    LightboxModule,
    NgbModule
  ],
  entryComponents: [
    AdminSplitGroupDetailsModalComponent,
    NewPaymentModalComponent,
    PaymentDetailsModalComponent,
    DetailsSavedDockerContainerComponent
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
    },
    AmountLeftPipePipe,
    {
      provide: InjectableRxStompConfig,
      useValue: stompConfig
    },
    {
      provide: RxStompService,
      useFactory: rxStompServiceFactory,
      deps: [InjectableRxStompConfig]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
