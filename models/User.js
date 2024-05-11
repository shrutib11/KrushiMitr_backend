const mongoose = require('mongoose');
const { Schema } = mongoose;                  //destructing in javascript

const UserSchema = new Schema({
    user_id : {
        type : Number,
        required : true,
    },
    user_name : {
        type : String,
        required : true,
    },
    email: {
        type : String,
        required: true,
    },
    password : {
        type : String,
        required : true,
    },
    user_type : {
        type : String,
        enum : ['Farmer', 'Expert'],
        required : true
    },
    rating : {
        type : Number,
        default : 0,
    },
}, {timestamps : true});

module.exports = mongoose.model('user', UserSchema);//model - Schema ko insert kaise karana hai 
