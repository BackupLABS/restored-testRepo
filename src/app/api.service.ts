import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();

@Injectable()
export class ApiService {
  
  loadingStatus = true;

  loadingSetTrue(){
    this.loadingStatus = true;
  }
  loadingSetFalse(){
    this.loadingStatus = false;
  }
  
  cities = []
  masters =[]
  users = []
  orders = []
  masterRating = [
    {mark: 1},
    {mark: 2},
    {mark: 3},
    {mark: 4},
    {mark: 5}
  ]
//  addr = "https://apple-pie-41428.herokuapp.com"
  addr = "http://localhost:5000"
  TOKEN_KEY = 'token'

  constructor( private http: HttpClient, 
    public router: Router,  
    public snackBar: MatSnackBar) { }

  get token() {
    return localStorage.getItem(this.TOKEN_KEY)
  }

  //// City CRUD /////////////////////////////
  getCities(){
    this.http.get<any>(this.addr+'/cities').subscribe( res => {
      this.cities = res 
    })   
  }

  addCity(cityName: string){    
    let city = {
      cityName: cityName
    } 
    this.http.post(this.addr+'/cities', city).subscribe(res => {
      if (res){
        this.getCities()
        this.openSnackBar('City succesfully saved')
      }
    })
  }

  editCity(data){
    this.http.put(this.addr+'/cities/' + data.ID, data).subscribe(res => {      
      if (res){
        this.getCities()
        this.openSnackBar('City succesfully saved')
      }
    })
  }

  deleteCity(data){
    this.http.delete(this.addr+'/cities/' + data.ID).subscribe(res =>{
      this.getCities()
      this.openSnackBar('City succesfully deleted')
    })
  }
  ////////////////////////////////////////////////////

  /////// CRUD Masters ///////////////////////////////
  getMasters(){
    this.http.get<any>(this.addr+'/masters').subscribe( res => {
      this.masters = res
      console.log('get masters:', res) 
    })     
  }

  addMaster(newMaster){    
    this.http.post(this.addr+'/masters', newMaster).subscribe( res => {
      if (res){
        this.getMasters()
        this.openSnackBar('Master succesfully saved')
      }
    })
  } 

  editMaster(data){
    this.http.put(this.addr+'/masters/' + data.id, data).subscribe( res => {
      if (res){
        // console.log(data)
        this.getMasters()
        this.openSnackBar('Master succesfully saved')
      }
    })
  }

  deleteMaster(data){
    this.http.delete(this.addr+'/masters/' + data.id).subscribe(res =>{     
      this.getMasters()
      this.openSnackBar('Master succesfully deleted')       
    })
  }
  //////////////////////////////////////

  /////// CRUD Users ///////////////////////////////
  initialUserData = {}
  getInitialRegisterData(data){
    console.log("API.getInitialRegisterData runs, id - ", data.id)    
    this.http.get<any>(this.addr+'/register/' + data.id).subscribe(res =>{
      this.initialUserData = res
      console.log("API.getInitialRegisterData data received ", this.initialUserData)
    })
  }

  getClients(){
    this.http.get<any>(this.addr+'/clients').subscribe( res => {
      this.users = res
    })     
  }

  currentUser ={}
  addClient(query){
    this.http.post<any>(this.addr+'/clients', query).subscribe(res =>{{
      if (res){
        console.log("client creation server response ",res)
        this.currentUser = res
        this.getClients()
        this.openSnackBar('Client succesfully saved')
      }
    }})
  }

  editClient(data){
    this.http.put(this.addr+'/clients/' + data.id, data).subscribe(res => {
      if (res){
        this.getClients()
        this.openSnackBar('Client succesfully saved')        // console.log(res)
      }
    })
  }

  deleteClient(data){
    console.log("delete user data ",data)
    this.http.delete(this.addr+'/clients/' + data.id).subscribe(res =>{      
      this.getClients()
      this.openSnackBar('Client succesfully deleted')      
    })
  }
  //////////////////////////////////////

  /////// CRUD Orders //////////////////////
  getOrders(){
    return this.http.get<any>(this.addr+'/orders').subscribe(res =>{
      if (res){
        this.orders = res
        console.log('get orders: ', this.orders)
      }
    })
  }

  getOrdersAfterChange(): Observable<any>{
    return this.http.get(this.addr+'/orders')   
  }

  deleteOrder(id): Observable<any>{
    return this.http.delete(this.addr+'/orders/' + id)
  }


  newOrderInformation 
  createOrder(newOrder){   
    // console.log("send order", newOrder)
    this.http.post(this.addr+'/orders', newOrder).subscribe(res =>{{
      if (res){
        console.log('order created ', res)
        console.log('order created full ', newOrder)
        this.newOrderInformation = newOrder
        this.router.navigate(['/neworder']) 
      }
    }})    
  }
  
  editOrder(data){    
    let orderInfo = {
      cityID: data.cityID, 
      masterID: data.masterID,
      clientID: data.clientID,
      date:data.date,
      time: data.time,
      duration: data.duration
    }
    console.log("send order ", data)
    this.http.put(this.addr+'/orders/' + data.id, orderInfo).subscribe(res =>{{
        console.log(res) 
        this.getOrders()     
    }})    
  }
  /////////////////////////////////////

  ////// App logic ///////////////////
  arr = []
  getFreeMasters(query){
     this.http.post<any>(this.addr+'/freemasters', query).subscribe( res => {
       this.loadingSetTrue()
       this.arr = res    
    })    
  }
  
  schedule = []
  getMastersShedule(query){
    // console.log('schedule query: ', query)
    this.http.post<any>(this.addr+'/schedule', query).subscribe( res => {
      //this.schedule = res.json()
      // console.log("received schedule data: ",res.json())
      // this.schedule = [{name:"Alice",hours:['qwe','qwe']}]
      let temp = res
      temp.forEach(element => {      
        element.hours=[]
        for (let i = 0; i < element.duration; i++) {
          element.hours[element.time - 8 + i]=element.ID 
        }
        // console.log(element)
      })
      this.schedule = temp
      temp.forEach(element => {
        
      })
      // console.log(temp)
      //{ID: 15, masterName: "Nastya", time: 8, duration: 3}
      console.log("received schedule temp: ",temp)
      // /// making appropriate array of hours when master is busy
      // this.schedule.forEach((master, index, array) => {
      //   master.hours = []
      //   let arr = master.busy[0].time
      //   let length = arr.length
      //   for (let index = 0; index < length; index++) {
      //     const element = arr[index];         
      //     let i = element - 8
      //     master.hours[i] = "Busy"         
      //   }
      // })
    })
  }

  updateMasterSchedule(orderInfo){    
    this.http.post(this.addr+'/order', orderInfo).subscribe(res => {
      if (res){
        console.log('master schedule updated')
        this.openSnackBar('You successfuly order a master')
        // refreshing masters array after adding new city
        this.getMasters()      
        this.getOrders()  
      }
    })    
  }



decodedToken
  IsLoggedIn = false
  Auth(login, password){
    let querry = {login: login, password: password}
    this.http.post<any>(this.addr+'/login', querry)    
    .subscribe(res => {
      if (res){
        console.log("login: ",res)
        localStorage.setItem('token', res.token)
        this.decodedToken = helper.decodeToken(res.token);
        console.log('decodedToken',this.decodedToken)
        if (this.decodedToken.isAdmin === 1) {
          this.router.navigate(['/admin']) 
          this.IsLoggedIn = true
        } else {
          this.router.navigate(['/neworder']) 
          // this.IsLoggedIn = true
        }       
      }
    })    
  }
  isLoggedIn(){
    return this.IsLoggedIn;
  }

  openSnackBar(message) {
    this.snackBar.open( message, 'Close', {
      duration: 2000,
    });
  }

}
