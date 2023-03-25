import { Injectable } from '@angular/core';
import axios from 'axios';
import { BehaviorSubject, Observable } from 'rxjs';

interface Album {
  imageUrl: string
}

interface Artist {
  id: string,
  artistName: string,
  artistImgUrl: string,
  popularity: string,
  followers: string,
  spotifyUrl: string,
  albums: Album[]
}

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  // artists: Array<Artist> = [];
  private _artists = new BehaviorSubject<Array<Artist>>([{
    id: '',
    artistName: '',
    artistImgUrl: '',
    popularity: '',
    followers: '',
    spotifyUrl: '',
    albums: []
  }]);

  setValue(artists: Artist[]): void {
    this._artists.next(artists);
  }

  get artists$(): Observable<Artist[]> {
    return this._artists.asObservable();
  }

  constructor() { }

  public clearArtists() {
    this._artists.value.length = 0
  }

  public async artistSearch(keywords: string[]) {
    const apiUrl = 'http://localhost:3000';

    // const response = await axios.get<Artist>(`${apiUrl}/getArtists`, {
    //   params: {
    //     keyword: keyword,
    //   },
    // });

    const promises = keywords.map(keyword => {
      return axios.get(`${apiUrl}/getArtists`, {
        params: {
          keyword: keyword,
        },
      });
    });

    let artists:Artist[] = []

    return Promise.all(promises).then(response => {
      let data = response.map(res => res.data);

      for (let artist of data) {
        let albums = artist.albumInfo.map(info => { return {imageUrl: info.imageUrl}})

        artists.push(
          {
            id: artist.id,
            artistName: artist.artistName,
            artistImgUrl: artist.artistImgUrl,
            popularity: artist.popularity,
            followers: artist.followers,
            spotifyUrl: artist.spotifyUrl,
            albums: albums,
          }
        );
      }

      this.setValue(artists)

      return
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
    return this._artists.value
  }
}
