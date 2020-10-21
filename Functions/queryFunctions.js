/* QUERY FUNCTIONS MODULE--- File contains all functions used in database queries */


/* CONFIGURATION */

/*Import modules*/
const axios = require('axios');
const mongoose = require('mongoose');

/* Environment variables */
const connectionString = process.env.DB_CONN_STRING;

/* Mongoose setup */
const uri = connectionString;
mongoose.connect(uri, {useNewUrlParser:true, useUnifiedTopology:true});



/* FUNCTIONS */

/* Function for getting schemas from the API. Gets only the schemas that don't already exist in the database.*/
function getSchemas(idArray, apiKey){
    idArray.map((id)=>{
        axios.get(`http://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v2/?key=${apiKey}&appid=${id}`)
        .then(res =>{
            console.log(`appID: ${id} --- PELIN NIMI: ${res.data.game.gameName}`);
        })
        .catch(err=>{
            console.log(err);
        })
    })
}
/* Checks if game already has an existing schema in the db. */
function gameIdMatch(id){
    
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
                appIDs[i] = res.data.response.games[i].appid;
            };
            // Get schemas for games that don't exist in the database. More info on the function.
            getSchemas(appIDs, apiKey);
        })
        .catch(err=>{
            console.log(err);
        });
    }
}
