import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsermsgsPageRoutingModule } from './usermsgs-routing.module';

import { UsermsgsPage } from './usermsgs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsermsgsPageRoutingModule
  ],
  declarations: [UsermsgsPage]
})
export class UsermsgsPageModule {}
