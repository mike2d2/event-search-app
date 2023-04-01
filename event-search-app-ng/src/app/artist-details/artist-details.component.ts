import { ArtistService } from './../artist.service';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';


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
  // artist: any;
  spotifyImgUrl = 'https://e7.pngegg.com/pngimages/152/944/png-clipart-spotify-icon-spotify-music-playlist-computer-icons-streaming-media-spotify-text-logo.png'
  showArtistTeam = true;

  constructor(public artistService: ArtistService, public dataService: DataService) {}
  ngOnInit(): void {
    // this.event = this.dataService.getSelectedEvent()

    this.artistService.artists$.subscribe(value => {
      this.artists = value;
      // this.artist = this.artists[0]
    });
    this.artists = this.artistService.getArtists()
    // this.artist = this.artists[0]

    this.dataService.event$.subscribe(value => {
      this.event = value;
      if (this.event.segment == 'Music') {
        // this.navigationItems.splice(1, 0, 'Artist/Team');
        this.showArtistTeam = true
      }
      else {
        this.showArtistTeam = false
      }
    });
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
