const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = new Schema({
    appID: String,
    achievementSchema:{
        game:{
            gameName: String,
            gameVersion: String,
            availableGameStats:{
                achievements: {
                    type: String
                }
            }
        }
    }
});

module.exports = mongoose.model('gameSchemaModel', gameSchema, 'gameSchemas');