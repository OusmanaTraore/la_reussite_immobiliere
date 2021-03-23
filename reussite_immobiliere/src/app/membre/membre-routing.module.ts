import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MembrePage } from './membre.page';

const routes: Routes = [
  {
    path: '',
    component: MembrePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MembrePageRoutingModule {}
