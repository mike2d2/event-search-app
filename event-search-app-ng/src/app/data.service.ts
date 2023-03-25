import { Injectable } from '@angular/core';
import axios from 'axios';
import { BehaviorSubject, Observable } from 'rxjs';

interface Event {
  id: string,
  eventName: string,
  dateTime: string,
  iconUrl: string,
  genre: string,
  venue: string,
  seatmapUrl: string,
  artistTeam: string,
  nameSegSubGenre: string,
  price: string,
  status: string,
  buyUrl: string,
  attractions: Attraction[]
}

interface Attraction {
  id: string,
  name: string
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  events: Array<Event> = [];
  selectedEvent: any;
  private _event = new BehaviorSubject<Event>({
    id: '',
    eventName: '',
    dateTime: '',
    iconUrl: '',
    genre: '',
    venue: '',
    seatmapUrl: '',
    artistTeam: '',
    nameSegSubGenre: '',
    price: '',
    status: '',
    buyUrl: '',
    attractions: [{
      id: '',
      name: ''
    }],
  });

  setValue(event: Event): void {
    this._event.next(event);
  }

  get event$(): Observable<Event> {
    return this._event.asObservable();
  }

  getSelectedEvent(): any {
    return this._event.value
  }

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

    const data = response.data;

    this.events.length = 0
    for (let event of data) {
      this.events.push(
        {
          id: event.id,
          eventName: event.eventName,
          dateTime: event.dateTime,
          iconUrl: event.iconUrl,
          genre: event.genre,
          venue: event.venue,
          seatmapUrl: event.seatmapUrl,
          artistTeam: event.artistTeam,
          nameSegSubGenre: event.nameSegSubGenre,
          price: event.price,
          status: event.status,
          buyUrl: event.buyUrl,
          attractions: event.attractions
        }
      );
    }

    return this.events;
  }

  attractions:Attraction[] = []

  public async getAttractionsAtEventId(eventId:string){
    const apiUrl = 'http://localhost:3000';

    const response = await axios.get<Attraction[]>(`${apiUrl}/getEventbyId`, {
      params: {
        id:eventId
      },
    });
    console.log(JSON.stringify(response.data))

    const data = response.data;

    this.attractions.length = 0
    for (let attraction of data) {
      this.attractions.push(
        {
          id: attraction.id,
          name: attraction.name,
        }
      );
    }

    return this.events;
  }
}

