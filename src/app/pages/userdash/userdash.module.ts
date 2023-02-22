import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserdashPageRoutingModule } from './userdash-routing.module';

import { UserdashPage } from './userdash.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserdashPageRoutingModule
  ],
  declarations: [UserdashPage]
})
export class UserdashPageModule {}
