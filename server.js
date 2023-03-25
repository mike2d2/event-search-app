// "use strict";
// var __importDefault = (this && this.__importDefault) || function (mod) {
//     return (mod && mod.__esModule) ? mod : { "default": mod };
// };
// Object.defineProperty(exports, "__esModule", { value: true });
// const express_1 = __importDefault(require("express"));
// const app = (0, express_1.default)();

// app.use(express_1.static(process.cwd()+"/my-app/dist/angular-nodejs-example/"));
const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const axios = require('axios');

const process = require('process');
const { url } = require('inspector');

var SpotifyWebApi = require('spotify-web-api-node');
process.chdir(__dirname)

// app.use(app.use(express.static(path.join(__dirname, '../event-search-app-ng/dist/event-search-app-ng'))));
app.use(express.static(path.join(__dirname, 'event-search-app-ng/dist/event-search-app-ng')));

app.use(cors({
  origin: true, // "true" will copy the domain of the request back
  // to the reply. If you need more control than this
  // use a function.

  credentials: true, // This MUST be "true" if your endpoint is
  // authenticated via either a session cookie
  // or Authorization header. Otherwise the
  // browser will block the response.

  methods: 'POST,GET,PUT,OPTIONS,DELETE' // Make sure you're not blocking
  // pre-flight OPTIONS requests
}));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'event-search-app-ng/dist/event-search-app-ng/index.html'));
});

// app.get('/', (req, res) => {
//     res.send('Well done!');
// });
app.listen(3000, () => {
  console.log('The application is listening on port 3000!');
});

const events = [
  { keyword: 'Table', distance: 10, category: 'Furniture', location: 'San Francisco' },
];

// for spotify
var clientId = 'ba6e5e910c644dbfa6775bd81349dde8',
clientSecret = 'ee670e03f859461b80222a072a20898a';

// Create the api object with the credentials
var spotifyApi = new SpotifyWebApi({
  clientId: clientId,
  clientSecret: clientSecret
});

searchedArtists = []

app.get('/getArtists', async (req, res) => {
  artistKeyword = req.query['keyword']
  searchedArtists.push(artistKeyword)

  if (!spotifyApi.hasOwnProperty('accessToken')) {
    // Retrieve an access token.
    spotifyApi.clientCredentialsGrant().then(
      function (data) {
        console.log('The access token expires in ' + data.body['expires_in']);
        console.log('The access token is ' + data.body['access_token']);

        // Save the access token so that it's used in future calls
        spotifyApi.setAccessToken(data.body['access_token']);

        data = buildResponse(res)
      },
      function (err) {
        console.log('Something went wrong when retrieving an access token', err);
      }
    );
  } else {
    data = buildResponse(res)
  }


  // // Get albums by a certain artist
  // spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE')
  //   .then(function (data) {
  //     console.log('Artist albums', data.body);
  //   }, function (err) {
  //     console.error(err);
  //   });
});

function buildResponse(artistKeyword, res) {


  // Search artists whose name contains 'Love'
  spotifyApi.searchArtists(artistKeyword)
    .then(function (data) {
      console.log('Search artists by "Love"', data.body);

      for (let artist of data.body.artists.items) {
        if (artistKeyword.toLowerCase() == artist.name.toLowerCase()) {
          let artist_response = {
            id: artist.id,
            artistName: artist.name,
            artistImgUrl: artist.images.length > 0 ? artist.images[0].url : '',
            popularity: artist.popularity,
            followers: artist.followers.total,
            spotifyUrl: artist.external_urls.spotify,
          }
          res.json(artist_response)
          return
        }
      }
      
    }, function (err) {
      console.error(err);
    });
}

app.get('/getEventbyId', async (req, res) => {
  const id = req.query
  const tm_api_key = 'Ehkv5SzqLQGAXzUT2ZwqPr9eYrdHfRFz';
  const baseUrl = `https://app.ticketmaster.com/discovery/v2/events/${id}.json?apikey=${tm_api_key}`;

  const response = await axios.get(baseUrl);
  const { data } = response;
  var { location: { lat, lng } } = data.results.length > 0 ? data.results[0].geometry : null;
  lat = lat ?? null
  lng = lng ?? null
})

app.get('/getEvents', async (req, res) => {

  const { keyword, location, category, distance } = req.query;


  if (location) {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=AIzaSyAm3VJvi7C40nB89kqKdoMpmXEQWpvzjFo`);
    const { data } = response;
    var { location: { lat, lng } } = data.results.length > 0 ? data.results[0].geometry : null;
    lat = lat ?? null
    lng = lng ?? null
    // latlon = `${lat},${lng}`;
  } else {
    lat = null;
    lon = null
  }

  const tmEventQueryUrl = tmEventUrlBuilder(keyword, lat, lng, category, distance);
  const response = await axios.get(tmEventQueryUrl);
  const { data } = response;

  let events;
  if (data.page.totalElements === 0) {
    events = '[]';
  } else {
    events = [] // data._embedded.events;
    for (let event of data._embedded.events) {

      try {
        var price = event.priceRanges[0].min + '-' + event.priceRanges[0].max;
      } catch {
        var price = 'no price available'
      }
      attractions = []
      if (event._embedded.attractions) {
        for (let attraction of event._embedded.attractions) {
          attractions.push({
            id: attraction.id,
            name: attraction.name
          })
        }
      }

      events.push({
        eventName: event.name ?? '',
        dateTime: event.dates.start.dateTime ?? '',
        date: event.dates.start.localDate ?? '',
        time: event.dates.start.localTime ?? '',
        iconUrl: event.images.length > 0 ? event.images[0].url : '',
        genre: event.classifications.length > 0 ? event.classifications[0].genre.name : '',
        venue: event._embedded.venues.length > 0 ? event._embedded.venues[0].name : '',
        seatmapUrl: event.seatmap?.staticUrl ?? '',
        artistTeam: event._embedded.attractions?.length > 0 ? event._embedded.attractions[0].name ?? '' : '',
        nameSegSubGenre: event.classifications[0].genre.name ?? '' + ' | ' + event.classifications[0].segment.name ?? '' + ' | ' + event.classifications[0].subGenre.name ?? '',
        price: price ?? '',
        status: event.dates.status.code ?? '',
        buyUrl: event.url ?? '',
        attractions: attractions
      })
    }
  }

  res.json(events);
});

function tmEventUrlBuilder(keyword, lat, lon, category, distance) {
  const tm_api_key = 'Ehkv5SzqLQGAXzUT2ZwqPr9eYrdHfRFz';
  let baseUrl = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${tm_api_key}`;

  if (keyword !== null) {
    baseUrl += `&keyword=${keyword}`;
  }

  if (lat !== null && lon !== null) {
    baseUrl += `&geoPoint=${lat},${lon}`;
  }

  if (category !== null && category !== 'all') {
    baseUrl += `&classificationName=${category}`;
  }

  if (distance !== null) {
    baseUrl += `&radius=${distance}`;
  }

  baseUrl += '&size=20';

  return baseUrl;
}

// app.get('/', (req,res) => {
//     res.sendFile(path.dirname(process.cwd()) +"/event-search-app-ng/dist/event-search-app-ng/index.html")
// });
