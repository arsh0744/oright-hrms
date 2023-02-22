import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {HomaPageRoutingModule } from './homa-routing.module';

import { HomaPage } from './homa.page';

@NgModule({
  imports: [
    IonicModule, 
    CommonModule,
    FormsModule,
    HomaPageRoutingModule
  ],
  declarations: [HomaPage]
})
export class HomaPageModule {}
