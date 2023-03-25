import { Injectable } from '@angular/core';
import axios from 'axios';
import { BehaviorSubject, Observable } from 'rxjs';

interface Album {
  albumName: string,
  albumImgUrl: string
}

interface Artist {
  id: string,
  artistName: string,
  artistImgUrl: string,
  popularity: string,
  followers: string,
  spotifyUrl: string,
}

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  artists: Array<Artist> = [];
  private _selectedArtist = new BehaviorSubject<Artist>({
    id: '',
    artistName: '',
    artistImgUrl: '',
    popularity: '',
    followers: '',
    spotifyUrl: '',
  });

  setValue(selectedArtist: Artist): void {
    this._selectedArtist.next(selectedArtist);
  }

  get selectedArtist$(): Observable<Artist> {
    return this._selectedArtist.asObservable();
  }

  constructor() { }

  public clearArtists() {
    this.artists.length = 0
  }

  public async artistSearch(keywords: string[]) {
    const apiUrl = 'http://localhost:3000';

    // const response = await axios.get<Artist>(`${apiUrl}/getArtists`, {
    //   params: {
    //     keyword: keyword,
    //   },
    // });
    this.artists.length = 0

    const promises = keywords.map(keyword => {
      return axios.get(`${apiUrl}/getArtists`, {
        params: {
          keyword: keyword,
        },
      });
    });

    return Promise.all(promises).then(response => {
      let data = response.map(res => res.data);

      for (let artist of data) {
        this.artists.push(
          {
            id: artist.id,
            artistName: artist.artistName,
            artistImgUrl: artist.artistImgUrl,
            popularity: artist.popularity,
            followers: artist.followers,
            spotifyUrl: artist.spotifyUrl,
          }
        );
      }

      return this.artists;
    });

    // const promise = axios.get<Artist>(`${apiUrl}/getArtists`, {
    //   params: {
    //     keyword: keyword,
    //   },
    // });

    // console.log(JSON.stringify(response.data))

    // const data = response.data;

    // let artist = data
    //   this.artists.push(
    //     {
    //       id: artist.id,
    //       artistName: artist.artistName,
    //       artistImgUrl: artist.artistImgUrl,
    //       popularity: artist.popularity,
    //       followers: artist.followers,
    //       spotifyUrl: artist.spotifyUrl,
    //     }
    //   );

    // return this.artists;
  }

  public getArtists() {
    return this.artists
  }
}
