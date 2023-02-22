import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Userclass } from 'src/app/models/userclass';
import { StorageserviceService } from 'src/app/services/storage/storageservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm : FormGroup
  formBuilder : FormBuilder
  existingUsers :Userclass[]=[]

  constructor(private formbuilder:FormBuilder,
              private  alertController : AlertController     ,
              private router: Router ,
              private loadingCtrl :LoadingController,
              private db :StorageserviceService
      ) {

      this.formBuilder = formbuilder

   }

  ngOnInit() {

    this.loginForm = this.createLoginForm()

  }


  loginAttempt(){

    let loginUser:Userclass={
      emp_id: this.loginForm.value.loginID,
      emp_password: this.loginForm.value.loginPass
    }
    let userExis :Userclass| undefined

    this.showLoading();
    this.db.dbState().subscribe(e=>{

      if(e){
        
        
         this.db.fetchUsers().subscribe(e=>{
          this.existingUsers=e
         }) 

      }
      else {
        console.log("Database Not Ready for Users")
      }

    })
   userExis = this.existingUsers.find(emp=>emp.emp_id==loginUser.emp_id && emp.emp_password==loginUser.emp_password)

   if(userExis!=undefined){
    setTimeout(() => {
      this.router.navigateByUrl('userdash')
    }, 3500);
   }
   else {
    setTimeout(() => {
      this.presentAlert('Invalid ID or Password','')
    }, 3500);
   }
    
    
/*
    if(this.loginForm.value.loginID=='OQ0059' && this.loginForm.value.loginPass=='arsh'){

      this.showLoading();
      setTimeout(() => {
        this.router.navigateByUrl('userdash')
      }, 3500);



    }

    else{

      setTimeout(() => {
        this.presentAlert('Invalid ID or Password','')
      }, 3500);
    

    }
    
     */
   
    

  }

  createLoginForm():FormGroup{

    return this.formBuilder.group({

        loginID : ['OQ0059',[Validators.required]],
        loginPass : ['arsh',[Validators.required]]

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
  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Logging In..........',
      duration: 3000,
    });
    loading.present();
  }

}
