import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdddatanowPageRoutingModule } from './adddatanow-routing.module';

import { AdddatanowPage } from './adddatanow.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdddatanowPageRoutingModule
  ],
  declarations: [AdddatanowPage]
})
export class AdddatanowPageModule {}
