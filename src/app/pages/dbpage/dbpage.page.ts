import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Userclass } from 'src/app/models/userclass';
import { StorageserviceService } from 'src/app/services/storage/storageservice.service';

@Component({
  selector: 'app-dbpage',
  templateUrl: './dbpage.page.html',
  styleUrls: ['./dbpage.page.scss'],
})
export class DbpagePage implements OnInit {

  Data :any[]=[]
  usersData :Userclass[]=[]

  constructor(

    private db :StorageserviceService,
    private route :Router
  ) { }

  ngOnInit() {
    
    
    this.db.dbState().subscribe(e=>{

      if(e){
        
         this.db.getUsers();
         this.db.fetchUsers().subscribe(e=>{
          this.usersData=e
         })
         this.db.fetchSongs().subscribe(item =>{
          this.Data=item
         })
       


      }
      else {
        console.log("Database Not Ready for Users")
      }

    })

      
  
  }

}
