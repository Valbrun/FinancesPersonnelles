import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdddataPage } from './adddata.page';

const routes: Routes = [
  {
    path: '',
    component: AdddataPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdddataPageRoutingModule {}
