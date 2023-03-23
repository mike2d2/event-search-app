import { Injectable } from '@angular/core';
import axios from 'axios';

interface Event {
  datetime: string;
  icon: string;
  eventName: string;
  genre: string;
  venue: string
}

interface ApiResponse {
  success: boolean;
  data: Event[];
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  events: Array<{keyword: '', distance: null, category: "", location: ""}> = [];

  constructor() { }

  public getEvents():Array<{keyword, distance, category, location}>{
    return this.events;
  }
  public async eventSearch(event: {keyword, distance, category, location}){
    const apiUrl = 'http://localhost:3000';

    const response = await axios.get<ApiResponse>(`${apiUrl}/getEvents`, {
      params: {
        keyword: event.keyword,
        distance: event.distance,
        category: event.category,
        location: event.location
      },
    });
    return response.data;

    this.events.push(event);
  }
}

