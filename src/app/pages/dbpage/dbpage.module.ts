import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DbpagePageRoutingModule } from './dbpage-routing.module';

import { DbpagePage } from './dbpage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DbpagePageRoutingModule
  ],
  declarations: [DbpagePage]
})
export class DbpagePageModule {}
