import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CommunistSplitComponent} from "./communist-split/communist-split.component";
import {BdoComponent} from "./bdo/bdo.component";
import {AdminComponent} from "./admin/admin.component";
import {PaymentDetailsComponent} from "./communist-split/payment-details/payment-details.component";
import {UsersComponent} from "./users/users.component";


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
    path: 'users/:id',
    component: UsersComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
