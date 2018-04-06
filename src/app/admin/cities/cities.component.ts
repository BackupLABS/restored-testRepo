import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from '../../api.service';
import { Observable } from 'rxjs/Observable'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent implements OnInit {

  constructor(
    public api: ApiService, 
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.api.getMasters()     
    this.api.getCities()
    this.api.getClients()
  }
  name: string;
  newCity: string
  
  /// open dialog edit city function
  openDialogEditCity(city): void {    
    let dialogRef = this.dialog.open(DialogEditCity, {
      width: '250px',
      data: { cityName: city.cityName, id: city._id}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  /// open dialog delete city function
  openDialogDeleteCity(city): void {    
    let dialogRef = this.dialog.open(DialogDeleteCity, {
      width: '250px',
      data: { cityName: city.cityName, id: city._id}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  addNewCity(){ 
    // calling addCity funcnion on API 
    this.api.addCity(this.newCity)
    // refreshing cities list on page
    this.api.getCities()
  }  
}


/// dialog delete city component
@Component({
  templateUrl: 'dialog-delete-city.html',
})
export class DialogDeleteCity {
  constructor(
    public api: ApiService,
    public dialogRef: MatDialogRef<DialogDeleteCity>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  onNoClick(): void {
    this.dialogRef.close();
  }
  delete(data){
    let id = data.id
    console.log(id)
    this.api.delete(id, 'city')
  }  
}

/// dialog edit city component
@Component({
  selector: 'dialog-edit',
  templateUrl: 'dialog-edit-city.html',
})
export class DialogEditCity {
  constructor(
    public api: ApiService,
    public dialogRef: MatDialogRef<DialogEditCity>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  onNoClick(): void {
    this.dialogRef.close();
  }
  edit(data){
    this.api.editCity(data) 
  }  
}


