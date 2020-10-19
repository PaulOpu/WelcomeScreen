var express = require("express");
var fs = require("fs");
const axios = require('axios');
const qs = require('querystring');
const bodyParser = require('body-parser');
var sortJsonArray = require('sort-json-array');
require('dotenv').config();

var app = express();
app.use(bodyParser.json());

// TODO: All the functions can get separated files in case the backend gets bigger
function getBearerToken() {
    //Get the App Auth Token
    let authURL = process.env.MS_AUTH_URL.concat(process.env.TENANT_ID,"/oauth2/v2.0/token");
    const requestBody = {
        grant_type: 'client_credentials',
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        scope: process.env.MS_SCOPE,
    };
    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
      
    return axios.post(authURL, qs.stringify(requestBody), config)
    .then((result) => {
        process.env.ACCESS_TOKEN = result.data.access_token;
    });
}

function getContent(res){
    // Get all events of the saved meeting rooms
    // TODO: change meeting room with frontend
    const config = {
        headers: { 
            Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
            //Prefer: "outlook.timezone=".concat('"',process.env.TIMEZONE,'"')
        }
    };
    let meetingRooms = process.env.ROOMS.split(",");

    const startDateString = "".concat(
        "end/dateTime ge '",
        new Date().toISOString(),
        "'"
    );

    const endDateString = "".concat(
        "start/dateTime lt '",
        new Date(new Date().setHours(23,59,59,999)).toISOString(),
        "'"
    );

    let getRoomEventsURLs = meetingRooms.map(room_name => {
        return process.env.MS_EVENTS_URL.concat(
            room_name,
            process.env.DOMAIN,
            "/events?filter=",
            startDateString,
            " and ",
            endDateString,
            "&select=subject,start,end,location");
    });

    let promises = [];
    let results = [];

    for (let i = 0; i < getRoomEventsURLs.length; i++) {
        promises.push(axios.get(getRoomEventsURLs[i], config));
    }
    return axios.all(promises)
    .then(axios.spread((...args) => {
        for (let i = 0; i < args.length; i++) {
            results.push(args[i].data);
        }
    }))
    .then(() => {
        let events = results.map(roomEvents => {
            return roomEvents.value.map(event => {
                if (event.location.locationType == "conferenceRoom"){
                    return {
                        "location":event.location.displayName,
                        "startTime":event.start.dateTime,
                        "endTime":event.end.dateTime,
                        "subject":event.subject,
                    }
                    
                }
            });
        });

        events = [].concat.apply([], events);
        let rawdata = fs.readFileSync('screenContent.json');
        let list = JSON.parse(rawdata)["list"];
        
        const screenContent = list.map(entry => {
            if (entry.type == "calendar"){
                entry.content = sortEvents(events)
            }
            return entry
        })
        res.send({"data":screenContent});
    })
    .catch((err) => {
        // expire only recognisable with message
        if (err.response) {
            const error = err.response.data.error;
            const code = error.code;
            const message = error.message;
            if(code == "InvalidAuthenticationToken" && message.includes("expire")){
                getBearerToken().then(() => {getContent(res)});
            }
        };
    });
}

function sortEvents(events) {
    const sortedEvents = sortJsonArray(events,"startTime","asc");
    return sortedEvents;
}

// app routes
app.get("/content", (req, res, next) => {
    // playlist + calendar
    getContent(res);
});

app.get("/playlist", (req, res, next) => {
    // playlist
    let rawdata = fs.readFileSync('screenContent.json');
    let list = JSON.parse(rawdata)["list"];
    res.send({data:list});
})

app.post("/set", (req, res, next) => {
    // set playlist
    //TODO: different api names
    const body = req.body;
    fs.writeFileSync('screenContent.json',JSON.stringify(body));
    res.sendStatus(200);
})


app.listen(3080, () => {
    getBearerToken();
    console.log("Server running on port 3080");
});

