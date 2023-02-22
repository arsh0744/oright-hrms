import { Injectable } from '@angular/core';
import {SQLite,SQLiteObject,SQLiteDatabaseConfig} from '@awesome-cordova-plugins/sqlite/ngx'
import {SQLitePorter} from '@awesome-cordova-plugins/sqlite-porter/ngx'
import { Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Song } from 'src/app/models/song';
import { Userclass } from 'src/app/models/userclass';

@Injectable({
  providedIn: 'root'
})
export class StorageserviceService {

  public storage: SQLiteObject;
  songsList = new BehaviorSubject<Song[]>([]);
  userList =  new BehaviorSubject<Userclass[]>([]);
  public isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
  database_config: SQLiteDatabaseConfig={
    name: 'oright_hrms_db.db',
    location:'default'
  }
 

  constructor(
    public platform: Platform, 
    public SQLite: SQLite, 
    public httpClient: HttpClient,
    public sqlPorter: SQLitePorter,
  ) {
      
/*
   this.platform.ready().then(() => {
      console.log("Platform Ready")
      this.sqlite.create({
        name: 'positronx_db.db',
        location: 'default'
      })
  .then((db: SQLiteObject) => {
          console.log("Inside then after db")
          this.storage = db;
          this.getFakeData();
      }).catch(()=>{
        console.log("No DataBase Created")
      })
    }).catch(()=>{
      console.log("Device Not Ready")
    })
    */
   
     
 
  this.SQLite.create(this.database_config).then((dbObj:SQLiteObject)=>{

    console.log("Success : Database Open")
    this.storage = dbObj;
    

    const createUserTableStmt =`CREATE TABLE IF NOT EXISTS orightemployeetable(
                                employeeid TEXT PRIMARY KEY, 
                                employeepass TEXT
                                )`

      this.storage.executeSql(createUserTableStmt,[]).then(

        (success)=>{console.log("User Table Created");this.isDbReady.next(true)},
        (err)=>{console.log("User Database Not Created",err)}

      )
    //  const stmt ="INSERT or IGNORE INTO orightemployeetable(employeeid, employeepass) VALUES ( 'Justin Bieber', 'Yummy')"

      //this.storage.executeSql(stmt,[]).then(

      //  (e)=>{console.log("Dummy Added:",e)},
      //  (r)=>{console.log("Dummy Not Added",r)}

     // )

    
                              


  },
  (err)=>{
    console.log("Error :",err)

  }).catch(()=>{console.log("Could Not Create Database")})
     

  }

  addAppUser(new_user:Userclass){
    var res:boolean;
    let data =[new_user.emp_id,new_user.emp_password]
    const addUserStmt = `INSERT INTO orightemployeetable VALUES(?,?)`
    this.storage.executeSql(addUserStmt,data).then(
      
      (success)=>{console.log('User Added');this.getUsers()},
      (err)=>{res=false}

    ).catch(()=>{console.log("Could Not Perform Query")})

      }

  fetchUsers():Observable<Userclass[]>{

    return this.userList.asObservable();

  }

  getUsers(){
/*
    let users :Userclass[]=[]
    const getUsersStmt = `SELECT * FROM oright_employee_table`
    return this.storage.executeSql(getUsersStmt,[]).then(

      res=>{
        let users :Userclass[]=[]
        if(res.rows.length>0){
          for (var i=0;i<res.rows.length;i++){
            users.push({
              emp_id:res.rows.item(i).emp_id,
              emp_password:res.rows.item(i).emp_password
            })
          }
        }
        this.userList.next(users)
      }

    ).catch(()=>{console.log("Could Not Perform Query")})
    */  

    return this.storage.executeSql('SELECT * FROM orightemployeetable', []).then(res => {
      
      
      const items:Userclass[] = []
     // const items: any[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) { 
          items.push({ 
            emp_id: res.rows.item(i).employeeid,
            emp_password: res.rows.item(i).employeepass,  
            
           });
        }
      }
      this.userList.next(items);
    });

  }



  dbState() {
    return this.isDbReady.asObservable();
  }
  fetchSongs(): Observable<Song[]> {
    
    return this.songsList.asObservable();
  }

    // Render fake data
    getFakeData() {
      this.httpClient.get(
        'assets/dump.sql', 
        {responseType: 'text'}
      ).subscribe(data => {
        
        this.sqlPorter.importSqlToDb(this.storage, data)
          .then(_ => {
            this.getSongs();
            this.isDbReady.next(true);
          })
          .catch(error => console.error(error));
      });
    }

  // Get list
  getSongs(){
    return this.storage.executeSql('SELECT * FROM songtable', []).then(res => {
      
      
      const items:Song[] = []
     // const items: any[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) { 
          items.push({ 
            id: res.rows.item(i).id,
            artist_name: res.rows.item(i).artist_name,  
            song_name: res.rows.item(i).song_name
           });
        }
      }
      this.songsList.next(items);
    });
  }
      

  

}
