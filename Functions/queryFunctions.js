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
    if(mongoose.connection.readyState == 1){
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
                                console.log(`Schema saved with appID ${id}`);
                            }
                        })
                    })
                    .catch(err=>{
                        console.log(err);
                    })
                }
            })
        })
    }
}

/* Function for saving updated user achievement stats to database */
function pushUserAchievements(achievementList,steamID, socket){
    console.log('PUSH STARTED. CONNETION STATE:' + mongoose.connection.readyState);
    // Check connection
    if(mongoose.connection.readyState == 1){
        console.log('CONNECTED TO DATABASE.')
        achievementList.forEach((app)=>{
            let query = {
                steamID:steamID,
                appID:app.appId
            };

            let newData = {
                steamID:steamID,
                appID:app.appId,
                achievementdata:app.response.data,
                progress:{
                    achievedCount:countAchieved(app.response.data.playerstats.achievements),
                    percentage: countProgress(app.response.data.playerstats.achievements),
                    isCompleted: isCompleted(app.response.data.playerstats.achievements)
                }
            };

            // Query updates existing object in DB if match is found, otherwise creates a new object
            userAchievementModel.findOneAndUpdate(query, newData, {upsert:true}, (err)=>{
                if (err) console.log(err);
                else{
                    console.log(`Updates completed succesfully for user ${steamID} appID ${app.appId}`);
                }
            });
        });

        socket.emit('updateDone'); // Injform client when update is finished
    }
    else{
        console.log('No database connection.')
    }
}

/* HELPER FUNCTIONS */
/* Function for counting amount of achieved achievements in a game */
function countAchieved(achievementArray){
    let amount = 0;

    try{
        achievementArray.forEach((achievement)=>{
            if(achievement.achieved==1){
                amount++;
            }
        });
    }catch(err){
        console.log(err)
    }

    return amount;
}
/*Function for counting the achievement progress percentage, outputs rounded integer*/
function countProgress(achievementArray){
    let progress = countAchieved(achievementArray)/achievementArray.length;

    return Math.round(progress*100);
}
/* Function for determining if game is completed or not. */
function isCompleted(achievementArray){
    let percentage = countProgress(achievementArray);

    if(percentage === 100){
        return true;
    }
    else{
        return false;
    }
}

/* EXPORTS -- Functions that are exported for use outside of the module*/
module.exports = {
    /* Function for updating schemas to DB. Can be used when adding new users or when user manually updates their
        game library. */
    updateSchemas: async function updateSchemas(steamID, apiKey, socket){
        this.getUserAppIdsAPI(steamID, apiKey).then((res)=>{
            const idArray = res;
            if(idArray===undefined){
                console.log('Update cancelled.');
                // Inform client that updates couldn't be done, getUserAppIdsAPI returns undefined if Steam profile is private, since no data is received from API
                socket.emit('unableToUpdate');
            } else{
                // Get schemas for games from the API, that don't exist in the database. Insert new schemas to database. More info on the function.
                insertSchemas(idArray, apiKey);
            }
        });
    },

    /* Funciton for getting a single schema for a game from the database */
    getSchemaDB: async function getSchemaDB(appId){
        const schema = await gameSchemaModel.find({'app':appId}).exec();
        return schema;
    },

    /* Function for updating user achievements to DB. */
    updateUserAchievements: async function updateUserAchievements(steamId, apiKey, appIDs, socket){  // appIDs is an array that configures the amount of updated games

        const getGameAchievements = async (steamId, appId, apiKey)=>{
            try{
                const achObj = {
                    appId: appId,
                    response:await axios.get(`http://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?appid=${appId}&key=${apiKey}&steamid=${steamId}`)
                }
                return achObj;
            } catch(err){
                console.log(err.message);
            }
        }
        
        const makeUpdateArray = async (idArray,steamId,apiKey)=>{
            return Promise.all(idArray.map(appId => getGameAchievements(steamId, appId, apiKey)))
        }
        
        makeUpdateArray(appIDs,steamId,apiKey).then(data =>{
            // Filter out empty indexes that resulted from apps that aren't games
            let preFiltered = data.filter((i)=>{
                return i !== undefined;
            })
            // Filter out any games which don't have any achievements
            let filteredArray = preFiltered.filter((i)=>{
                return i.response.data.playerstats.achievements !==undefined;
            })

            filteredArray.forEach(app=>{
                console.log(app.appId + '--' + app.response.data.playerstats.gameName);
            })

            pushUserAchievements(filteredArray, steamId, socket);
        })
    },

    /* Function for getting all appId's related to a singe steamId from the database*/
    getUserAppIdsDB: async function getUserAppIds(steamId){
        // Get Id's from the database
        const data = await userAchievementModel.find({'steamID':steamId}).exec();
        // Return the data in an array by utilizing array.map default array
        return data.map((id)=>id.appID);
    },

    /* Function for getting all appId's related to a single steamId from the Steam Web API. Returns an array of appIds. */
    getUserAppIdsAPI: async function getUserAppIdsAPI(steamId, apiKey){
        console.log('STARTED FETCHING APP IDS FROM API')
        const getOwnedGames = async (steamId, apiKey) =>{
            try{
                const games = await axios.get(`http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${apiKey}&steamid=${steamId}&format=json`);
                return games;
            } catch(err) {
                console.log(err);
            }
        }

        const makeIdArray = async (steamId, apiKey) =>{
            try{
                const ids = await getOwnedGames(steamId, apiKey);
                return ids.data.response.games.map((game) => game.appid.toString());
            } catch(err){
                console.log(err);
            }
        }

        const idArray = await makeIdArray(steamId,apiKey);
        return idArray;
    },

    /* Function for getting user achievements for all games with the specified stemId into one array */
    getUserAchievementsDB: async function getUserAchievementsDB(steamId){
        try{
            // Get achievement stats, array sorted aplhabetically
            const data = await userAchievementModel.find({'steamID':steamId}).sort({'achievementdata.playerstats.gameName':1}).exec();
            return data;
        } catch(err){
            console.log(err);
        }
    },

    /* Function for getting user achievements for a single game from the database.*/
    getAchievementListDB: async function getAchievementListDB(steamId,appId){
        try{
            const gameAchievements = await userAchievementModel.find({'steamID':steamId,'appID':appId}).exec();
            return gameAchievements;
        } catch (err){
            console.log(err);
        }
    },

    sortAchievementObject: async function sortAchievementObject(steamId,appId){
        try{
            // Get schema and achievement object and store them into varibales
            let schema = await this.getSchemaDB(appId);
            let userAchievements = await this.getAchievementListDB(steamId,appId);

            schema = schema[0].toObject();
            userAchievements = userAchievements[0].toObject();

            // Merge data from schema to userAchievements object
            userAchievements.achievementdata.playerstats.achievements.forEach((achievement)=>{
                // Get corresponding achievement from schema with achievement apiname
                const schemaData = schema.achievementSchema.game.availableGameStats.achievements.find(({name})=> name === achievement.apiname);
                // Delete apiname from data to avoid multiple instances of same data in the object
                delete schemaData.name;
                // Add the schema data to main achievement object
                achievement['schemaData'] = schemaData;
            })

            return userAchievements;
        } catch(err){
            console.log(err);
        }
        
    }
}