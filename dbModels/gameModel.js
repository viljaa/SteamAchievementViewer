const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = new Schema({
    appID: String,
    achievementSchema:{
        game:{
            gameName: String,
            gameVersion: String,
            availableGameStats:{
                achievements: [{
                    name: String,
                    defaultValue:Number,
                    displayName: String,
                    hidden: Number,
                    description:String,
                    icon:String,
                    icongray:String
                }]
            }
        }
    }
});

module.exports = mongoose.model('gameSchemaModel', gameSchema, 'gameSchemas');