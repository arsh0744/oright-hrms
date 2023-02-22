import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.page.html',
  styleUrls: ['./attendance.page.scss'],
})
export class AttendancePage implements OnInit {

 
  today= new Date();
  date:any
  time:any
  public myDate = new Date().toISOString();
  constructor(private datePipe: DatePipe) { 

    this.date = this.datePipe.transform(this.today, 'yyyy-MM-dd');
    

  }

  ngOnInit() {
    

  }

  getTime(){
    this.time=this.datePipe.transform(this.today,"HH:mm")
    console.log(this.time)
    console.log(this.myDate);
    
  }

}
