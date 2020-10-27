/* BACKEND NODE.JS SERVER */

/* Modules */
const express = require('express');
const path = require('path');
const http = require('http');
require('dotenv').config();
const dbQuery = require('./functions/queryFunctions.js');

/* Environment variables */
const apiKey = process.env.API_KEY;
const steamID = process.env.STEAM_ID; // Only for dev purposes, will be deleted later before deployment

/* App setup */
const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 5000;

/* Mongoose setup */

//Import model


// Serving React client
app.use(express.static(path.join(__dirname, '/client/build')));

server.listen(port, ()=>{
    console.log(`Server listening to port ${port}`)
});

// Server-side routing
app.get('/*', (req,res)=>{
    res.sendFile(__dirname + '/client/build/index.html');
});

// Testing queries, temporary, will be deleted later

/*dbQuery.getUserAppIdsDB(steamID).then((res)=>{
    // Here is where you utilize the result
});*/

//dbQuery.updateSchemas(steamID,apiKey);

/*let idArray = ['35140','8980']
dbQuery.updateUserAchievements(steamID,apiKey,idArray);*/