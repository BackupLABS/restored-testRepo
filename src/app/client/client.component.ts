import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

import { ApiService } from '../api.service';
import { ClientSubmitedForm } from '../models/clientsubmitedform'

@Component({
  selector: 'client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  /// FORM VALIDATION PART
  email = new FormControl('', [Validators.required, Validators.email])
  name = new FormControl('', [Validators.required, Validators.minLength(3)])
  city = new FormControl('', [Validators.required])
  date = new FormControl('', [Validators.required])
  time = new FormControl('', [Validators.required])
  size = new FormControl('', [Validators.required])

  getEmailErrorMessage() {
    return this.email.hasError('required') ? 'You must enter email' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }

  getNameErrorMessage() {
    return this.name.hasError('required') ? 'Name is required' :
        this.name.hasError('minlength') ? 'Should be at least 3 characters' :
            '';
  }

  getCityErrorMessage() {
    return this.city.hasError('required') ? 'You must choose city' : '';
  }

  getDateErrorMessage() {
    return this.date.hasError('required') ? 'You must choose date' : '';
  }

  getTimeErrorMessage() {
    return this.time.hasError('required') ? 'You must choose time' : '';
  }  

  getSizeErrorMessage() {
    return this.size.hasError('required') ? 'You must choose size' : '';
  } 

  //// LOGIC PART
  isFormSubmitted = false

  // submitedForm = {
  //   startHour:'',
  //   workTime: '',
  //   date:'',
  //   city:'',
  //   email:'',
  //   name:'',
  //   busy:[]
  // }

  submitedForm = new ClientSubmitedForm('','', '','','','',[])
  

  workHours = [
    {hour: 8},
    {hour: 9},
    {hour: 10},
    {hour: 11},
    {hour: 12},
    {hour: 13},
    {hour: 14},
    {hour: 15},
    {hour: 16},
    {hour: 17}    
  ]

  clockSize =[
    {
      size: "big",
      workTime: 3
    },
    {
      size: "medium",
      workTime: 2
    },
    {
      size: "small",
      workTime: 1
    }
  ]

  makeOrder(masterId) {
    let oderInfo = {
      id: masterId,
      date: Date.parse(this.submitedForm.date.toString()),
      time: this.submitedForm.busy
    }
    this.api.updateMasterSchedule(oderInfo)
    // Clear form and page to initial state
    this.isFormSubmitted = false
    this.submitedForm = new ClientSubmitedForm('','', '','','','',[])
    this.api.arr = []
    this.email = new FormControl('', [Validators.required, Validators.email])
    this.name = new FormControl('', [Validators.required, Validators.minLength(3)])
    this.city = new FormControl('', [Validators.required])
    this.date = new FormControl('', [Validators.required])
    this.time = new FormControl('', [Validators.required])
    this.size = new FormControl('', [Validators.required])
  }
   

  constructor( public api: ApiService) { }
    
  ngOnInit() {
   this.api.getMasters()
   this.api.getCities()
  }

  find() {     
    // this for changing layout when client 
    this.isFormSubmitted = true;

    this.workiHoursAnalizer(this.submitedForm.startHour, this.submitedForm.workTime)
     
    // forming query object
    let query = {
      city: this.submitedForm.city,
      date: Date.parse(this.submitedForm.date.toString()),
      time: this.submitedForm.busy
    }    

    let clientQuery = {
      name: this.submitedForm.name,
      email: this.submitedForm.email
    }

    this.api.getFreeMasters(query)
    this.api.sendClientData(clientQuery)
    //let mastersFromCity = this.api.arr   
  }

    
  // forms array of busi hours for submitted form data
  workiHoursAnalizer(start:any, duration:any){
    let time = []
    time.push(start)
    if (duration === 3) {
      time.push(start+1)
      time.push(start+2) 
    } else if (duration === 2){
      time.push(start+1)      
    } 
    this.submitedForm.busy = time    
  }
}


