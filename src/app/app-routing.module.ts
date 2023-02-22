import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SampledbComponent } from './sampledb/sampledb.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./homa/homa.module').then(m => m.HomaPageModule)
  },
  {
    path: 'splash',
    loadChildren: () => import('./pages/splash/splash.module').then( m => m.SplashPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'userdash',
    loadChildren: () => import('./pages/userdash/userdash.module').then( m => m.UserdashPageModule)
  },
  {
    path: 'sampledb',
    component: SampledbComponent,
  },
  {
    path: 'dbpage',
    loadChildren: () => import('./pages/dbpage/dbpage.module').then( m => m.DbpagePageModule)
  }
  
  
  
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
