import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  
  events:any;

  constructor(public dataService: DataService) { }

  ngOnInit() {
    this.events = this.dataService.favoriteEvents;    
  }

  removeEvent(eventId: string) {
    confirm("Event Removed from Favorites! ")
    this.dataService.removeFavorite(eventId)
    this.events = this.dataService.favoriteEvents
  }
}
