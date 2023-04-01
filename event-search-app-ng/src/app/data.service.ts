import { Injectable } from '@angular/core';
import axios from 'axios';
import { BehaviorSubject, Observable } from 'rxjs';

interface Event {
  id: string,
  eventName: string,
  dateTime: string,
  date: string,
  iconUrl: string,
  genre: string,
  venue: string,
  seatmapUrl: string,
  artistTeam: string,
  nameSegSubGenre: string,
  price: string,
  status: string,
  buyUrl: string,
  attractions: Attraction[],
  venueObj: any
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
  suggestUrl = '/api/suggest'
  suggestions:string[] = []
  apiUrl = 'http://localhost:3000';
  private _event = new BehaviorSubject<Event>({
    id: '',
    eventName: '',
    dateTime: '',
    date: '',
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
    venueObj: {}
  });

  favoriteEvents:Event[] = []

  getFavorites() : Event[] {
    return this.favoriteEvents
  }

  addFavorite(): void {
    this.favoriteEvents.push(this.getSelectedEvent())
  }

  removeFavorite(eventId:string):void {
    this.favoriteEvents = this.favoriteEvents.filter((event) => event.id !== eventId);
  }

  setValue(event: Event): void {
    this._event.next(event);
  }

  get event$(): Observable<Event> {
    return this._event.asObservable();
  }

  getSelectedEvent(): any {
    return this._event.value
  }

  isFavorite():boolean {
    return this.favoriteEvents.some(event => event.id === this._event.value.id);
  }

  constructor() { }

  public getEvents():Array<Event>{
    return this.events;
  }

  public async eventSearch(event: {keyword, distance, category, location}){

    const response = await axios.get<Event[]>(`${this.apiUrl}/getEvents`, {
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
          date: event.date,
          iconUrl: event.iconUrl,
          genre: event.genre,
          venue: event.venue,
          seatmapUrl: event.seatmapUrl,
          artistTeam: event.artistTeam,
          nameSegSubGenre: event.nameSegSubGenre,
          price: event.price,
          status: event.status,
          buyUrl: event.buyUrl,
          attractions: event.attractions,
          venueObj: event.venueObj
        }
      );
    }

    return this.events;
  }

  getSuggestions(keyword):string[] {
      // call the backend API to get suggestions
      axios.get<string[]>(`${this.apiUrl}/api/suggest/`, {
        params: {
          keyword:keyword
        },
      })
        .then((response) => {
          this.suggestions = response.data;
          return this.suggestions
        })
        .catch((error) => {
          console.log(error);
          return []
        });

      return []
  }

  attractions:Attraction[] = []

  public async getAttractionsAtEventId(eventId:string){

    const response = await axios.get<Attraction[]>(`${this.apiUrl}/getEventbyId`, {
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

