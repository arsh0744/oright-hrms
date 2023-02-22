import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';


import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {StatusBar} from '@awesome-cordova-plugins/status-bar/ngx'
import { ReactiveFormsModule } from '@angular/forms';
//import {SMS} from '@awesome-cordova-plugins/sms/ngx'
import {Camera} from '@awesome-cordova-plugins/camera/ngx'
import {LocalNotifications} from '@awesome-cordova-plugins/local-notifications/ngx'
import {Geolocation} from '@awesome-cordova-plugins/geolocation/ngx'
import {NativeGeocoder} from '@awesome-cordova-plugins/native-geocoder/ngx'
import { SwiperModule } from 'swiper/angular';
import { CommonModule, DatePipe } from '@angular/common';
import {HttpClientModule} from '@angular/common/http'
import {SQLite,SQLiteObject} from '@awesome-cordova-plugins/sqlite/ngx'
import {SQLitePorter} from '@awesome-cordova-plugins/sqlite-porter/ngx'
//import { StorageserviceService } from './services/storage/storageservice.service';
import { Platform } from '@ionic/angular';
import { StorageserviceService } from './services/storage/storageservice.service';



@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule,
           IonicModule.forRoot(),
           AppRoutingModule,
           ReactiveFormsModule,
           SwiperModule,
           HttpClientModule,
           CommonModule,    
                 
           
              
          ],

  providers: [StatusBar,
              Camera,
              LocalNotifications,
              Geolocation,
              NativeGeocoder,
              DatePipe,
              SQLite,
              SQLitePorter,
              Platform,
             
            
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
