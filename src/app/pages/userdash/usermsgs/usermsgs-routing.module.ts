import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsermsgsPage } from './usermsgs.page';

const routes: Routes = [
  {
    path: '',
    component: UsermsgsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsermsgsPageRoutingModule {}
