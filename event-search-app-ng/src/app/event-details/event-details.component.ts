import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { DataService } from '../data.service';


@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
  event:any
  constructor(public dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.event$.subscribe(value => {
      this.event = value;
    });
  }

  getOnSaleText() {
    if (this.event.status == 'onsale') {
      return 'On Sale';
    }
  
    if (this.event.status == 'offsale') {
      return 'Off Sale';
    }
  
    if (this.event.status == 'cancelled') {
      return 'Cancelled';
    }
  
    if (this.event.status == 'postponed') {
      return 'Postponed';
    }
  
    if (this.event.status == 'rescheduled') {
      return 'Rescheduled';
    }

    return ''
  }

  getOnSaleStyle() {
    if (this.event.status == 'onsale') {
      return 'background-color: green';
    }
  
    if (this.event.status == 'offsale') {
      return 'background-color: red';
    }
  
    if (this.event.status == 'cancelled') {
      return 'background-color: black';
    }
  
    if (this.event.status == 'postponed') {
      return 'background-color: orange';
    }
  
    if (this.event.status == 'rescheduled') {
      return 'background-color: orange';
    }

    return 'background-color: gray';
  }

  // used chatgpt for this function
  getFacebookShareLink(e) {
    e.preventDefault();
    let postText = `Check ${this.event.eventName} on Ticketmaster`
    const fbShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(this.event.buyUrl)}&quote=${postText}`;
    window.open(fbShareUrl, '_blank');
    return fbShareUrl;
  }

  getTwitterShareLink(e) {
    e.preventDefault();
    let postText = `Check ${this.event.eventName} on Ticketmaster`
    const twitterShareUrl = `https://twitter.com/share?text=${postText}&url=${encodeURIComponent(this.event.buyUrl)}`;
    window.open(twitterShareUrl, '_blank');
    return twitterShareUrl;
  }
}
