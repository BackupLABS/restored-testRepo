import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { MatDialog } from '@angular/material';
import { FormControl, Validators} from '@angular/forms';
import { CitiesService } from '../../services/cities.service';
import { MastersService } from '../../services/masters.service';
import { DialogEditMasterComponent } from './dialogs/dialog.edit.master.component';
import { DialogDeleteMasterComponent } from './dialogs/dialog.delete.master.component';

@Component({
  templateUrl: './masters.component.html',
  styleUrls: ['./masters.component.css']
})
export class MastersComponent implements OnInit {
  public masters;
  cities = [];
  name: string;
  masterRating = [
    {mark: 1},
    {mark: 2},
    {mark: 3},
    {mark: 4},
    {mark: 5}
  ];
  newMaster = {
    cityId: '',
    masterName : '',
    masterRating: ''
  };
  newMasterName = new FormControl('', [Validators.required]);
  newMasterRatingEdit = new FormControl('', [Validators.required]);
  newMasterCity = new FormControl('', [Validators.required]);

  constructor(
    public citiesService: CitiesService,
    public api: ApiService,
    public service: MastersService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.service.getMasters();
    this.citiesService.getCities()
      .subscribe(res => {
        this.cities = res;
      });
  }

  getMasterNameErrorMessage() {
    return this.newMasterName.hasError('required') ? 'Name is required' :
              '';
  }

  getMasterRatingMessage() {
    return this.newMasterRatingEdit.hasError('required') ? 'Rating is required' :
              '';
  }

  getMasterCityMessage() {
  return this.newMasterCity.hasError('required') ? 'City is required' :
            '';
  }

  // Clean after submit
  clean(): void {
      this.newMaster = {
      cityId: '',
      masterName : '',
      masterRating: ''
    };
    this.newMasterName.reset();
    this.newMasterRatingEdit.reset();
    this.newMasterCity.reset();
  }

  /// open dialog delete master function
  openDialogDeleteMaster(master): void {
    const dialogRef = this.dialog.open(DialogDeleteMasterComponent, {
      width: '250px',
      data: { masterName: master.masterName, id: master.id}
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  /// open dialog edit master
  openDialogEditMaster(master): void {
    console.log('MASTER', master);
    const dialogRef = this.dialog.open(DialogEditMasterComponent, {
      width: '250px',
      data: { masterName: master.masterName, id: master.id, masterRating: master.masterRating, cityID: master.city.id}
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  addNewMaster() {
    // calling addMaster function on API
    console.log('add new master', this.newMaster);
    this.service.addMaster(this.newMaster);
    // refreshing masters list on page
    this.service.getMasters();
  }
}
