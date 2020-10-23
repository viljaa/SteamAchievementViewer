const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userAchievementsSchema = new Schema({
    steamID:String,
    appID:String,
    achievementdata:{
        playerstats:{
            steamID:String,
            gameName: String,
            achievements:{}
        }
    }
},{strict:false})

module.exports = mongoose.model('userAchievementModel', userAchievementsSchema, 'userAchievements');