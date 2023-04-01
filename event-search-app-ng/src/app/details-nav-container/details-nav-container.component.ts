import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../data.service';

interface Event {
  eventName: string,
  dateTime: string,
  iconUrl: string,
  genre: string,
  venue: string,
  segment: string
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
    venue: 'venue',
    segment: 'Music'
  }

  navigationItems = ['Event', 'Artist/Team', 'Venue'];
  selectedNavItem = 'Event';
  isClicked = false
  isDetailsCardVisible = false
  showArtistTeam = true

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
    this.isClicked = this.dataService.isFavorite()
    this.dataService.event$.subscribe(value => {
      this.isClicked = this.dataService.isFavorite();
    });

    this.dataService.event$.subscribe(value => {
      this.event = value;
      // if (this.event.segment == 'Music') {
      //   // this.navigationItems.splice(1, 0, 'Artist/Team');
      //   this.showArtistTeam = true
      // }
      // else {
      //   this.showArtistTeam = false
      // }
    });
  }

  goBack() {
    this.dataService.setIsEventTableVisible(true);
    this.dataService.setIsEventDetailsVisible(false);
  }

  // from chatgpt

  onClick() {
    this.isClicked = !this.isClicked;

    if (this.isClicked) {
      confirm("Event Added to Favorites! ")

      this.dataService.addFavorite()
    }
    else {
      confirm("Event Removed from Favorites! ")
      this.dataService.removeFavorite(this.dataService.getSelectedEvent().id)
    }
  }

  selectNavItem(item: string) {
    this.selectedNavItem = item;
  }
}
