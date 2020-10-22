const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userAchievementsSchema = new Schema({
    steamID:String,
    games:{
        appID:{
            playerstats:{
                steamID:String,
                gameName: String,
                achievements:{

                }
            }
        }

    }
})

module.exports = mongoose.model('userAchievementModel', userAchievementsSchema, 'userAchievements');