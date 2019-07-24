import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CommunistSplitComponent} from "./communist-split/communist-split.component";
import {BdoComponent} from "./bdo/bdo.component";


const routes: Routes = [
  {
    path: 'communist-split',
    component: CommunistSplitComponent
  },
  {
    path: 'bdo',
    component: BdoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
