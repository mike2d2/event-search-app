import { Component, Input } from '@angular/core';

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
export class DetailsNavContainerComponent {
  @Input() event: Event = {
    eventName: 'no name',
    dateTime: 'time',
    iconUrl: 'placeholder url',
    genre: 'genre',
    venue: 'venue'
  }
  navigationItems = ['Event', 'Artist/Team'];
  selectedNavItem = 'Event';

  selectNavItem(item: string) {
    this.selectedNavItem = item;
  }
}
