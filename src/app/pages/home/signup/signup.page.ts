import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
//import {SMS,SmsOptions} from '@awesome-cordova-plugins/sms/ngx'
import {LocalNotifications} from '@awesome-cordova-plugins/local-notifications/ngx'
import { SwiperModule } from 'swiper/angular';
import Swiper from 'swiper';
import { OtpserviceService } from 'src/app/services/otpservice/otpservice.service';
import { Router } from '@angular/router';
import { Userclass } from 'src/app/models/userclass';
import { StorageserviceService } from 'src/app/services/storage/storageservice.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  otpForm: FormGroup
  submitOTPForm :FormGroup
  userDetailsForm :FormGroup
  userPasswordForm:FormGroup
  formBuilder : FormBuilder
  otpGenerated : number
   contactNumber ='9419236714'
   smsText ='Your OTP for Mobile Verification is :'
   private slides: Swiper;
   hasOTPBeenGen : boolean
   
   newuser:Userclass={
     emp_id: '',
     emp_password: ''
   }
 
   

  constructor(

    private alertController : AlertController,
    private formbuilder : FormBuilder,
    //public sms :SMS,
    public localNotification : LocalNotifications,
    private loadingCtrl : LoadingController,
    private  otpserv :OtpserviceService,
    private router :Router,
    private storageServ :StorageserviceService
    

  ) { 

    this.formBuilder=formbuilder

  }

  ngOnInit() {


    this.otpForm= this.createOTPForm();
    this.submitOTPForm = this.createSubmitOTPForm();
    this.userDetailsForm=this.createUserDetailsForm();
    this.userPasswordForm = this.createUserPasswordForm()
    this.otpserv.otp.subscribe(e=>{

      this.hasOTPBeenGen=e;
      

    });
    console.log("OTP Generated :",this.hasOTPBeenGen)


  }


  getOTP(){

   this.newuser.emp_id=this.otpForm.value.empID;


    this.otpGenerated = Math.trunc(Math.random()*1000000)
    console.log(this.otpGenerated)
      this.getOTPviaSMS(this.otpGenerated) 
    this.otpserv.otpGenerated(true)
    console.log("OTP Generated :",this.hasOTPBeenGen)
    setTimeout(() => {
      this.slides.slideTo(1)
    }, 4000);
    this.otpForm.reset()
    
    

  }

  getOTPviaSMS(otp:number){
/*
    var options : SmsOptions ={
      replaceLineBreaks:false,
      android:{
        intent:'INTENT'
      }
    }
    const msg = `${this.smsText}${otp}`
    this.sms.send(this.contactNumber,msg,options).then((data)=>{
      if(data)
      alert(JSON.stringify(data))
    },
    (err)=>{
      alert(JSON.stringify(err))
    }
    )
   

*/


//------------------------Local Push Notification---------------------


   this.showLoading("Sending OTP") ;
     const msg = `${this.smsText}${otp}`
      this.localNotification.schedule({

        title:'ORight Sign-Up',
        text: msg,
        trigger: {at: new Date(new Date().getTime() +3500)},
        led: 'FF0000',
        foreground:true
            })



//--------------------------------------------------------------------

  }

  getOTPviaMail(){

  }

  createOTPForm():FormGroup{

      return this.formBuilder.group({

        empID : ['',[Validators.required]]

      })

  }


  async presentAlert(msg:string,subhdr:string) {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: subhdr,
      message: msg,
      buttons: ['OK'],
    });

    await alert.present();
  }


  setSwiperInstance(swiper: Swiper) {
    this.slides = swiper;
    console.log(this.slides.activeIndex)
  }
 
  async showLoading(msg:string) {
    const loading = await this.loadingCtrl.create({
      message: msg,
      duration: 3000,
    });
    loading.present();
  }

  createSubmitOTPForm(): FormGroup{
    return this.formBuilder.group({
      otpInput:['',[Validators.required]]
    })
  }

  submitOTP(){

    this.showLoading("Verifying OTP")
   if (this.submitOTPForm.value.otpInput==this.otpGenerated){
    this.submitOTPForm.reset()    
    setTimeout(() => {
      this.slides.slideNext()
    }, 3500);
    

   }
   else{

    setTimeout(() => {
      this.presentAlert("In-Valid OTP","")
    }, 3500);
    
    
    
   }
  }

  createUserDetailsForm():FormGroup{

    return this.formBuilder.group({

      first_name:['Arshjot',[Validators.required]],
      last_name:['Singh',[Validators.required]],
      age:[8,[Validators.required]],
      designation:['Software Developer',[Validators.required]],

    })
  }
  nextForm(){
    this.slides.slideNext();
  }
  skipImageForm(){
    //this.slides.slidePrev()
    
    this.showLoading("Signing Up ......")
    setTimeout(() => {
      this.showLoading("Sign-Up Successful,Please Log-In....")
    }, 3500);
   
    setTimeout(() => {
      this.router.navigateByUrl('home/login')
    }, 7000);
    setTimeout(() => {
      this.slides.slideToLoop(0,1000,false)
    }, 7100);
  }

  createUserPasswordForm():FormGroup{
    return this.formBuilder.group({

        new_user_emp_id : ['',[Validators.required]],
        new_user_password :['',[Validators.required]]


    })

  }
  createUser(){

    this.newuser.emp_password=this.userPasswordForm.value.new_user_password
    console.log(this.newuser)
    this.storageServ.addAppUser(this.newuser)
    this.userPasswordForm.reset();
    this.slides.slideNext();
  }

}


