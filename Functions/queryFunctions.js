/* QUERY FUNCTIONS MODULE--- File contains all functions used in database and API queries */


/* CONFIGURATION */

/*Import modules*/
const axios = require('axios');
const mongoose = require('mongoose');

/* Environment variables */
const connectionString = process.env.DB_CONN_STRING;

/* Mongoose setup */
const uri = connectionString;
mongoose.connect(uri, {useNewUrlParser:true, useUnifiedTopology:true});
// Import models
const gameSchemaModel = require('../dbModels/gameModel');
const userAchievementModel = require('../dbModels/userAchievements');



/* FUNCTIONS */

/* Function for getting schemas from the API. Gets only the schemas that don't already exist in the database.*/
function insertSchemas(idArray, apiKey){
    // Wait until connection is established
    mongoose.connection.once('open',()=>{
        idArray.map((id)=>{
            // Check app already has a schema saved in the database
            gameSchemaModel.countDocuments({app:id},(err,res) => {
                if (err){
                    console.log(err);
                } 
                // If no matches are found, get game schema from API amd save to database
                else if(res == 0){
                    console.log('Fetching schema...');
                    axios.get(`http://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v2/?key=${apiKey}&appid=${id}`)
                    .then(res =>{
                        console.log(`app: ${id} --- GAME: ${res.data.game.gameName}`);
                        // Push schema to database collection
                        mongoose.connection.collection('gameSchemas').insertOne({app:id,achievementSchema:res.data},(err,res)=>{
                            if (err){
                                console.log(err);
                            }
                            else{
                                console.log(`Schema saved with app ${id}`);
                            }
                        })
                    })
                    .catch(err=>{
                        console.log(err);
                    })
                }
            })
        })
    })
}

/* NOT FINISHED! --- Function for saving updated user achievement stats to database */
function pushUserAchievements(achievementList,steamID){
    // Check connection
    mongoose.connection.once('open', ()=>{
        achievementList.map((app)=>{
            let query = {
                steamID:steamID,
                appID:app.appId
            };

            let newData = {
                steamID:steamID,
                appID:app.appId,
                achievementdata:app.data
            };

            userAchievementModel.findOneAndUpdate(query, newData, {upsert:true}, (err)=>{
                if (err) console.log(err);
                else{
                    console.log(`Updates completed succesfully for user ${steamID} and appID ${app.appId}`);
                }
            });
        });
    });
}

module.exports = {
    /* Function for updating schemas to DB. Can be used when adding new users or when user manually updates their
        game library. */
    updateSchemas: function updateSchemas(steamID, apiKey){
        let appIDs = [];
        // Make query to fetch a list of users appIDs
        axios.get(`http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${apiKey}&steamid=${steamID}&format=json`)
        .then(res => {
            console.log(res.data);
            for (i in res.data.response.games){
                appIDs[i] = res.data.response.games[i].appid.toString();
            };
            // Get schemas for games from the API, that don't exist in the database. Insert new schemas to database. More info on the function.
            insertSchemas(appIDs, apiKey);
        })
        .catch(err=>{
            console.log(err);
        });
    },

    /* Function for updating user achievements to DB. Works similar to updateSchemas()-function. */
    updateUserAchievements: function updateUserAchievements(steamID, apiKey, appIDs){  // appIDs is an array that configures the amount of updated games
        // Create array for storing API results for different games
        let achievementUpdates = [];

        appIDs.map((appId)=>{
            // Get users achievements for the game from API
            axios.get(`http://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?appid=${appId}&key=${apiKey}&steamid=${steamID}`)
            .then(res =>{
                achievementUpdates.push({
                    appId: appId,
                    data: res.data
                });
            })
            .catch(err=>{
                console.log(err);
            })
        })
        pushUserAchievements(achievementUpdates, steamID)

        return true;
    }
}