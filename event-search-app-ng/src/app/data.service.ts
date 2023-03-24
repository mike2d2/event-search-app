import { Injectable } from '@angular/core';
import axios from 'axios';

interface Event {
  eventName: string,
  dateTime: string,
  iconUrl: string,
  genre: string,
  venue: string
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  events: Array<Event> = [];

  constructor() { }

  public getEvents():Array<Event>{
    return this.events;
  }

  public async eventSearch(event: {keyword, distance, category, location}){
    const apiUrl = 'http://localhost:3000';

    const response = await axios.get<Event[]>(`${apiUrl}/getEvents`, {
      params: {
        keyword: event.keyword,
        distance: event.distance,
        category: event.category,
        location: event.location
      },
    });
    console.log(JSON.stringify(response.data))
    // this.events = data

    // event.dates.start.localDate + '\n' + event.dates.start.localTime,
    // `<img src=${event.images[0].url} style='height:60px; width:90px'></img>`,
    // '<a class="name-link" id=' + event.id + 'href="#" onclick="eventClick(\''+ event.id + '\')">' + event.name + '</a>',
    // event.classifications[0].genre.name,
    // event._embedded.venues[0].name
    // let tableEvents:Event[] = []
    // const tableEvents: Event[] = data._embedded.events.map((event: any) => ({
    //   name: event.name,
    //   date: event.dates.start.localDate,
    //   location: `${event._embedded.venues[0].name}, ${event._embedded.venues[0].city.name}, ${event._embedded.venues[0].state.stateCode}`
    // }));
    // const response = await axios.get<TicketmasterResponse>('https://app.ticketmaster.com/discovery/v2/events.json?apikey=YOUR_API_KEY');
    const data = response.data;
    // this.events = data._embedded.events.map((event) => ({
    //   name: event.name,
    //   date: event.dates.start.dateTime,
    //   location: `${event._embedded.venues[0].name}, ${event._embedded.venues[0].city.name}, ${event._embedded.venues[0].state.stateCode}`,
    //   iconUrl: event.images.length > 0 ? event.images[0].url : '',
    //   genre: event.classifications.length > 0 ? event.classifications[0].genre.name : '',
    //   venue: event._embedded.venues.length > 0 ? event._embedded.venues[0].name : ''
    // }));
    for (let event of data) {
      this.events.push(
        {
          eventName: event.eventName,
          dateTime: event.dateTime,
          iconUrl: event.iconUrl,
          genre: event.genre,
          venue: event.venue
        }
      );
    }

    return this.events;
  }
}

