/* BACKEND NODE.JS SERVER */

/* Modules */
const express = require('express');
const path = require('path');
const http = require('http');
const socket = require('socket.io');
require('dotenv').config();
const dbQuery = require('./functions/queryFunctions.js');

/* Environment variables */
const apiKey = process.env.API_KEY;
const steamID = process.env.STEAM_ID; // Only for dev purposes, will be deleted later before deployment

/* App setup */
const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 5000;

/* Socket setup */
const io = socket(server);

// Serving React client
app.use(express.static(path.join(__dirname, '/client/build')));

server.listen(port, ()=>{
    console.log(`Server listening to port ${port}`)
});

// Server-side routing
app.get('/*', (req,res)=>{
    res.sendFile(__dirname + '/client/build/index.html');
});

/* Listening to socket events */
io.on('connection', (socket)=>{
    console.log(`Client ${socket.id} connected.`);

    socket.on('searchbarAction',(data)=>{
        console.log('viewquery triggered');
        if(data.doesUpdate==1){
            // Update schemas and user achievements
            /*dbQuery.updateSchemas(data.steamId, apiKey, ()=>{
                dbQuery.updateUserAchievements(data.steamId, apiKey, )
            });*/
        }
        else if(data.doesUpdate==0){
            // Start viewing process
            dbQuery.getUserAchievementsDB(data.steamId).then((res)=>{
                //Send result array to client
                socket.emit('gamelistData', res);
            })
        }
    })

    // UNFINISHED - socket event for manual update for a single game
    socket.on('updateOneGame', (data)=>{
        console.log(data.steamId);
        console.log(data.appId);
    })
    
});
// Testing queries, temporary, will be deleted later

/*dbQuery.getUserAppIdsAPI(data.steamId, apiKey).then((res)=>{
    console.log('ID ARRAY ---- '+res);
})*/

/*dbQuery.getUserAppIdsDB(steamID).then((res)=>{
    // Here is where you utilize the result
});*/

//dbQuery.updateSchemas(steamID,apiKey);

/*let idArray = ['35140','8980']
dbQuery.updateUserAchievements(steamID,apiKey,idArray);*/