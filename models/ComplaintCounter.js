const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ComplaintCounter = new Schema({
    counter : {
        type:String,
        required : true
    },
    curr_id : {
        type : Number,
        required : true
    }
}, {timestamps: true})

module.exports = mongoose.model('ComplaintCounter', ComplaintCounter);