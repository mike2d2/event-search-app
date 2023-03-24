import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-events-table',
  templateUrl: './events-table.component.html',
  styleUrls: ['./events-table.component.css']
})
export class EventsTableComponent implements OnInit {

  events;
  selectedEvent;

  constructor(public dataService: DataService) { }

  ngOnInit() {
    this.events = this.dataService.getEvents();    
  }

  public selectEvent(event){
    this.selectedEvent = event;
  }
}

