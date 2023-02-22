import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DbpagePage } from './dbpage.page';

const routes: Routes = [
  {
    path: '',
    component: DbpagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DbpagePageRoutingModule {}
