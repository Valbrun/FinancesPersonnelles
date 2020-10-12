import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdddatanowPage } from './adddatanow.page';

const routes: Routes = [
  {
    path: '',
    component: AdddatanowPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdddatanowPageRoutingModule {}
