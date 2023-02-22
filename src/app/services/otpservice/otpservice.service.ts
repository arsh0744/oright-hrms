import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OtpserviceService {


  private otpExists = new BehaviorSubject<boolean>(false);
  otp = this.otpExists.asObservable();

  constructor() { }

  otpGenerated(current:boolean){

    this.otpExists.next(current)
   
  }

  
}
