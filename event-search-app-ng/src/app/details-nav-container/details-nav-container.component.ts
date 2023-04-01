import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../data.service';

interface Event {
  eventName: string,
  dateTime: string,
  iconUrl: string,
  genre: string,
  venue: string
}

@Component({
  selector: 'app-details-nav-container',
  templateUrl: './details-nav-container.component.html',
  styleUrls: ['./details-nav-container.component.css']
})
export class DetailsNavContainerComponent implements OnInit {
  @Input() event: Event = {
    eventName: 'no name',
    dateTime: 'time',
    iconUrl: 'placeholder url',
    genre: 'genre',
    venue: 'venue'
  }

  navigationItems = ['Event', 'Artist/Team', 'Venue'];
  selectedNavItem = 'Event';
  isClicked = false

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
    this.isClicked = this.dataService.isFavorite()
    this.dataService.event$.subscribe(value => {
      this.isClicked = this.dataService.isFavorite();
    });
  }

  // from chatgpt

  onClick() {
    this.isClicked = !this.isClicked;

    if (this.isClicked) {
      this.dataService.addFavorite()
    }
    else {
      this.dataService.removeFavorite(this.dataService.getSelectedEvent().id)
    }
  }

  selectNavItem(item: string) {
    this.selectedNavItem = item;
  }
}
