import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CommunistSplitComponent} from "./communist-split/communist-split.component";
import {BdoComponent} from "./bdo/bdo.component";
import {AdminComponent} from "./admin/admin.component";
import {PaymentDetailsComponent} from "./communist-split/payment-details/payment-details.component";
import {UsersComponent} from "./users/users.component";
import {PaymentsStatisticsComponent} from "./communist-split/payments-statistics/payments-statistics.component";
import {DockerComponent} from "./docker/docker/docker.component";
import {DetailsRunningDockerContainerComponent} from "./docker/details-running-docker-container/details-running-docker-container.component";
import {SpotifyComponent} from "./spotify/spotify.component";


const routes: Routes = [
  {
    path: 'communist-split',
    component: CommunistSplitComponent
  },
  {
    path: 'bdo',
    component: BdoComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'communist-split/payments/:id',
    component: PaymentDetailsComponent
  },
  {
    path: 'communist-split/stats/:group-id/:user-id',
    component: PaymentsStatisticsComponent
  },
  {
    path: 'docker',
    component: DockerComponent
  },
  {
    path: 'users/:id',
    component: UsersComponent
  },
  {
    path: 'docker/:alias',
    component: DetailsRunningDockerContainerComponent
  },
  {
    path: 'spotify',
    component: SpotifyComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
