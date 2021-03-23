import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MembrePageRoutingModule } from './membre-routing.module';

import { MembrePage } from './membre.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MembrePageRoutingModule
  ],
  declarations: [MembrePage]
})
export class MembrePageModule {}
