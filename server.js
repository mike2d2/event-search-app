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

const process = require('process')
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

app.get('/getEvents', async (req, res) => {
    // console.log('hit endpoint')
    // const keyword = req.query.keyword;
    // const distance = parseInt(req.query.distance);
    // const category = req.query.category;
    // const location = req.query.location;
    // // const filteredUsers = users.filter(user => user.name.toLowerCase().includes(name.toLowerCase()));
    // // res.json(events);
    // // response.writeHead(200, {"Content-Type": "application/json"});
    // // response.write(JSON.stringify(events));
    // res.send(events)

    const { keyword, location, category, distance } = req.query;

    let latlon;
    if (location) {
      const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=AIzaSyAm3VJvi7C40nB89kqKdoMpmXEQWpvzjFo`);
      const { data } = response;
      const { location: { lat, lng } } = data.results[0].geometry;
      latlon = `${lat},${lng}`;
    } else {
      latlon = null;
    }
  
    const tmEventQueryUrl = tmEventUrlBuilder(keyword, latlon, category, distance);
    const response = await axios.get(tmEventQueryUrl);
    const { data } = response;
  
    let events;
    if (data.page.totalElements === 0) {
        events = '[]';
    } else {
        events = [] // data._embedded.events;
        for (let event of data._embedded.events) {
            events.push({
                eventName: event.name,
                dateTime: event.dates.start.dateTime,
                iconUrl: event.images.length > 0 ? event.images[0].url : '',
                genre: event.classifications.length > 0 ? event.classifications[0].genre.name : '',
                venue: event._embedded.venues.length > 0 ? event._embedded.venues[0].name : ''
            })
        }
    }
    
    
    // for (let event in events) {

    // }
  
    res.json(events);
});

function tmEventUrlBuilder(keyword, latlon, category, distance) {
    const tm_api_key = 'Ehkv5SzqLQGAXzUT2ZwqPr9eYrdHfRFz';
    let baseUrl = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${tm_api_key}`;
  
    if (keyword !== null) {
      baseUrl += `&keyword=${keyword}`;
    }
  
    if (latlon !== null) {
      baseUrl += `&geoPoint=${latlon}`;
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
