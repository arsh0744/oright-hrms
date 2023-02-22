import { Component, OnInit } from '@angular/core';
import { Geolocation ,GeolocationOptions} from '@awesome-cordova-plugins/geolocation/ngx';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  lattitude :any=0
  longtitude :any=0
  constructor(private geoLocation : Geolocation) { }

  ngOnInit() {
this.getDeviceLocation();
    

  }

  options : GeolocationOptions={
    timeout:10000,
    enableHighAccuracy:true,
    maximumAge : 5000
  }


  getDeviceLocation(){
    this.geoLocation.getCurrentPosition().then((res)=>{

      console.log(this.lattitude=res.coords.latitude)
      console.log(this.longtitude=res.coords.longitude)

    },
    (err)=>{
      console.error(err)

    }
    ).catch((error)=>{
      console.error("Error Getting Location :",error)
    })
  }

}
