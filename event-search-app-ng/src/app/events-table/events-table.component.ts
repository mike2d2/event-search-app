import { Component, Input, OnInit } from '@angular/core';
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
  @Input() isDetailsCardVisible = false;
  visible = true

  constructor(public dataService: DataService, public artistService: ArtistService) { }

  ngOnInit() {
    this.events = this.dataService.getEvents();    
  }

  public selectEvent(event){
    this.selectedEvent = event;
    this.dataService.setValue(event)

    this.artistService.clearArtists()

    this.artistService.artistSearch(this.selectedEvent.attractions.map(attraction => attraction.name))
    this.dataService.setIsEventTableVisible(false);
    this.dataService.setIsEventDetailsVisible(true);
  }

  // from chatgpt
  currentSortColumn: string = '';
  isSortReverse: boolean = false;

  sort(column: string) {
    if (column === this.currentSortColumn) {
      this.isSortReverse = !this.isSortReverse;
    } else {
      this.currentSortColumn = column;
      this.isSortReverse = false;
    }

    this.events.sort((a, b) => {
      const aValue = a[column].toLowerCase();
      const bValue = b[column].toLowerCase();

      if (aValue < bValue) {
        return this.isSortReverse ? 1 : -1;
      } else if (aValue > bValue) {
        return this.isSortReverse ? -1 : 1;
      } else {
        return 0;
      }
    });
  }
}

