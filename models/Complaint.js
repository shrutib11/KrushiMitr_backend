const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Complaint = new Schema({
    complaint_id : {
        type : Number,
        required : true,
    },
    posted_by_id : {
        type : Number,
        required : true,
    },
    posted_by: {
        type : String,
        required: true,
    },
    message : {
        type : String,
        required : true,
    },
    status : {
        type : String,
        enum : ['Pending', 'Resolved'],
        default : 'Pending'
    },
    steps_taken : {
        type : String,
    }
}, {timestamps : true});

module.exports = mongoose.model('complaint', Complaint);
