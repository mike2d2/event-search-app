import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-event-search',
  templateUrl: './event-search.component.html',
  styleUrls: ['./event-search.component.css']
})
export class EventSearchComponent implements OnInit {

  event : {keyword, distance, category, location} = {keyword: '', distance: null, category: "", location: ""};

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
    this.dataService.eventSearch(this.event);

    this.event = {keyword: '', distance: null, category: "", location: ""};
  }
}

