import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserdashPage } from './userdash.page';

const routes: Routes = [
  {
    path: '',
    component: UserdashPage,
    children:[

      {
        path: 'feed',
        loadChildren: () => import('./feed/feed.module').then( m => m.FeedPageModule)
      },
      {
        path: 'useraccount',
        loadChildren: () => import('./useraccount/useraccount.module').then( m => m.UseraccountPageModule)
      },
      {
        path: 'attendance',
        loadChildren: () => import('./attendance/attendance.module').then( m => m.AttendancePageModule)
      },
      {
        path: '',
        redirectTo: '/userdash/feed',
        pathMatch: 'full'
      }


    ]
  },
  {
    path: '',
    redirectTo: '/userdash/feed',
    pathMatch: 'full'
  },

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserdashPageRoutingModule {}
