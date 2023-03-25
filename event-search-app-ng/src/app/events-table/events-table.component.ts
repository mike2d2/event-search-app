import { Component, OnInit } from '@angular/core';
import { ArtistService } from '../artist.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-events-table',
  templateUrl: './events-table.component.html',
  styleUrls: ['./events-table.component.css']
})
export class EventsTableComponent implements OnInit {

  events;
  selectedEvent;

  constructor(public dataService: DataService, public artistService: ArtistService) { }

  ngOnInit() {
    this.events = this.dataService.getEvents();    
  }

  public selectEvent(event){
    this.selectedEvent = event;
    this.dataService.setValue(event)

    this.artistService.clearArtists()

    this.artistService.artistSearch(this.selectedEvent.attractions.map(attraction => attraction.name))
  }
}

