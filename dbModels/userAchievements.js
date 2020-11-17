const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userAchievementsSchema = new Schema({
    steamID:String,
    appID:String,
    achievementdata:{
        playerstats:{
            steamID:String,
            gameName: String,
            achievements:[{
                apiname:String,
                achieved:Number,
                unlocktime: Number
            }]
        }
    }
},{strict:false,collation:{locale:'en',strength:1}})

module.exports = mongoose.model('userAchievementModel', userAchievementsSchema, 'userAchievements');