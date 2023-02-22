import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageserviceService } from '../services/storage/storageservice.service';

@Component({
  selector: 'app-sampledb',
  templateUrl: './sampledb.component.html',
  styleUrls: ['./sampledb.component.scss'],
})


export class SampledbComponent implements OnInit {
  
  Data :any[]=[]

  constructor(

    private db :StorageserviceService,
    private route :Router
  ) { }

  ngOnInit() {
    console.log('a')
    this.db.getFakeData()
    this.db.fetchSongs().subscribe(item=>{
      this.Data=item
    })
   /*
    this.db.dbState().subscribe((res)=>{
      console.log('b')
      if(res){
        console.log('c')
        this.db.fetchSongs().subscribe(item=>{
          console.log('d')
          this.Data= item
          console.log(this.Data)
        })
      }
      else 
      {
        console.log("No Data")
      }
     
    })

*/
  }

}
