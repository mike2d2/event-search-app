import { ArtistService } from './../artist.service';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

interface Artist {
  id: string,
  artistName: string,
  artistImgUrl: string,
  popularity: string,
  followers: string,
  spotifyUrl: string
}

interface Attraction {
  id: string,
  name: string
}

@Component({
  selector: 'app-artist-details',
  templateUrl: './artist-details.component.html',
  styleUrls: ['./artist-details.component.css']
})
export class ArtistDetailsComponent implements OnInit {
  event:any;
  artists: Artist[] = [];
  artist: any;
  spotifyImgUrl = 'https://e7.pngegg.com/pngimages/152/944/png-clipart-spotify-icon-spotify-music-playlist-computer-icons-streaming-media-spotify-text-logo.png'

  constructor(public artistService: ArtistService, public dataService: DataService) {}
  ngOnInit(): void {
    // this.event = this.dataService.getSelectedEvent()

    // this.dataService.event$.subscribe(value => {
    //   this.event = value;
    //   this.updateArtists();
    // });
    this.artists = this.artistService.getArtists()
    this.artist = this.artists[0]
  }

  updateArtists(): void {
    this.artists.length = 0
    // this.artistService.clearArtists()
    // for (let attraction of this.event.attractions) {
    //   this.artistService.artistSearch(attraction.name)
    // }

    // this.artists = this.artistService.getArtists()
  }
}
