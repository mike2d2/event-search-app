import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-event-search',
  templateUrl: './event-search.component.html',
  styleUrls: ['./event-search.component.css']
})
export class EventSearchComponent implements OnInit {

  event : {keyword, distance, category, location} = {keyword: 'dodger', distance: 23, category: "sports", location: "908 everett st los angeles"};
  isChecked: boolean = false;
  latitude:number = NaN;
  longitude:number = NaN;

  constructor(public dataService: DataService) { }

  ngOnInit() {
  }

  eventSearch(){
    console.log(this.event);
    this.dataService.eventSearch(this.event);
    this.event = {keyword: '', distance: null, category: "", location: ""};
  }

  submitForm() {
    // if (form.valid) {
    //   console.log('Form submitted!');
    // }
    console.log(this.event);

    if (this.isChecked) {
      this.event.location = this.latitude + ',' + this.longitude
    } 
    
    this.dataService.eventSearch(this.event);

    this.event = {keyword: 'dodger', distance: 23, category: "sports", location: "908 everett st los angeles"} //{keyword: '', distance: null, category: "", location: ""};
  }

  onCheckboxChange(event) {
    this.isChecked = event.target.checked;
    if (this.isChecked) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
        });
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    } else {
      this.latitude = NaN;
      this.longitude = NaN;
    }
  }
}

