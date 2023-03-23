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

const process = require('process')
process.chdir(__dirname)

// app.use(app.use(express.static(path.join(__dirname, '../event-search-app-ng/dist/event-search-app-ng'))));
app.use(express.static(path.join(__dirname, 'event-search-app-ng/dist/event-search-app-ng')));

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

app.get('/getEvents', (req, res) => {
    const keyword = req.query.keyword;
    const distance = parseInt(req.query.distance);
    const category = req.query.category;
    const location = req.query.location;
    // const filteredUsers = users.filter(user => user.name.toLowerCase().includes(name.toLowerCase()));
    // res.json(events);
    // response.writeHead(200, {"Content-Type": "application/json"});
    // response.write(JSON.stringify(events));
    res.send(events)
});

// app.get('/', (req,res) => {
//     res.sendFile(path.dirname(process.cwd()) +"/event-search-app-ng/dist/event-search-app-ng/index.html")
// });
