/* BACKEND NODE.JS SERVER */

/* Modules */
const express = require('express');
const path = require('path');
const http = require('http');
const socket = require('socket.io');
require('dotenv').config();
const dbQuery = require('./Functions/queryFunctions.js');

/* Environment variables */
const apiKey = process.env.API_KEY;

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
    
    // Socket event for handling searchbar actions
    socket.on('searchbarAction',(data)=>{
        if(data.doesUpdate==1){
            // Update schemas and user achievements
            dbQuery.updateSchemas(data.steamId, apiKey, socket).then(()=>{
                dbQuery.getUserAppIdsAPI(data.steamId, apiKey).then((res)=>{  // Get IdArray needed for updateUserAchievement function.
                    dbQuery.updateUserAchievements(data.steamId, apiKey, res, socket, 'updateDone') // Use IdArray from result to update user achievements.
                })
            })
        }
        else if(data.doesUpdate==0){
            // Start viewing process
            dbQuery.getUserAchievementsDB(data.steamId).then((res)=>{
                //Send result array to client
                socket.emit('gamelistData', res);
            })
        }
    })

    // Socket event for getting user profile data from API
    socket.on('getUserProfile',(data)=>{
        dbQuery.getUserProfileAPI(data.steamId,apiKey).then((res)=>{
            socket.emit('userProfileData', res);
        })
    })

    // Socket event for manual update for a single game
    socket.on('updateOneGame', (data)=>{
        dbQuery.updateOneGame(data.steamId, data.appId, apiKey, socket, 'oneGameUpdated')
    })

    // Socket event for refreshing data of data level after manual update
    socket.on('refreshUserAchievements', (data)=>{
        dbQuery.getUserAchievementsDB(data.steamId).then((res)=>{
            socket.emit('updateDataLevel',res);
        })
    });

    // Socket event for getting achievement data of a single game
    socket.on('getGameAchievements',(data)=>{
        dbQuery.sortAchievementObject(data.steamId,data.appId).then((res)=>{
            socket.emit('gameAchievementData', res);
        });
    })

    // Disconnecting
    socket.on('disconnect', ()=>{
        console.log('Disconnected client: '+socket.id)
    })
    
});