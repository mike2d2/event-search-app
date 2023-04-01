import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-venue-details',
  templateUrl: './venue-details.component.html',
  styleUrls: ['./venue-details.component.css']
})
export class VenueDetailsComponent implements OnInit {
  event:any
  constructor(public dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.event$.subscribe(value => {
      this.event = value;
    });
  }

  show=false;

  collapsed = true
  
}
