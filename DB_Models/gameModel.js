const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gamesCollection = new Schema({
    appID:{
        type:Number,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    achievements:[
       {
            id:Number,
            name:String,
            description:String,
            rarity:Number,
            picture_url:String
        }
    ]
});