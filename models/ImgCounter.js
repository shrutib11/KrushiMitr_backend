const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const imageCounter = new Schema({
    counter : {
        type:String,
        required : true
    },
    curr_id : {
        type : Number,
        required : true
    }
}, {timestamps: true})

module.exports = mongoose.model('ImgCounter', imageCounter);