import { ModalComponent } from '../modal/modal.component';

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../data.service';

import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-venue-details',
  templateUrl: './venue-details.component.html',
  styleUrls: ['./venue-details.component.css']
})
export class VenueDetailsComponent implements OnInit {
  event:any
  map: any
  google: any;

  constructor(public dataService: DataService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.dataService.event$.subscribe(value => {
      this.event = value;

      this.show1Visible = this.event.venueObj.openHours.length > 40
      this.show2Visible = this.event.venueObj.generalRule.length > 40
      this.show3Visible = this.event.venueObj.childRule.length > 40
    });

    this.show1Visible = this.event.venueObj.openHours.length > 40
    this.show2Visible = this.event.venueObj.generalRule.length > 40
    this.show3Visible = this.event.venueObj.childRule.length > 40
    
  }

  show1 = false
  show1Visible = false

  show1Click() {
    this.show1 = !this.show1
  }

  show2 = false
  show2Visible = false

  show2Click() {
    this.show2 = !this.show2
  }

  show3 = false
  show3Visible = false

  show3Click() {
    this.show3 = !this.show3
  }

  displayStyle = "none";
  
  openModal() {

    const dialogRef = this.dialog.open(ModalComponent, {
      width: '400px',
      height: '500px',
      data: { lat: this.event.venueObj.lat, lon: this.event.venueObj.lon }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  
  
}
