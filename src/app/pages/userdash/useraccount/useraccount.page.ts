import { Component, OnInit } from '@angular/core';
import { Camera,CameraOptions } from '@awesome-cordova-plugins/camera/ngx';

@Component({
  selector: 'app-useraccount',
  templateUrl: './useraccount.page.html',
  styleUrls: ['./useraccount.page.scss'],
})
export class UseraccountPage implements OnInit {

  clickedImage : string
  options: CameraOptions = {
    quality: 30,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  constructor(private camera : Camera) { }

  ngOnInit() {
  }


  changeImg(){

    this.camera.getPicture(this.options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.clickedImage = base64Image;
    }, (err) => {
      console.log(err);
      // Handle error
    });
  }

  }


