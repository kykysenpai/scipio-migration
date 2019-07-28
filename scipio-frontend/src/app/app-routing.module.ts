import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CommunistSplitComponent} from "./communist-split/communist-split.component";
import {BdoComponent} from "./bdo/bdo.component";
import {AdminComponent} from "./admin/admin.component";


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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
