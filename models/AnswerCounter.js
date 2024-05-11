const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const answerCounterSchema = new Schema({
    counter : {
        type:String,
        required : true
    },
    curr_id : {
        type : Number,
        required : true
    }
}, {timestamps: true})

module.exports = mongoose.model('AnswerCounter', answerCounterSchema);
