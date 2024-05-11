const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    question_id : {
        type : Number,
        required:true
    },
    question_title : {
        type:String,
        required:true
    },
    question : {
        type:String,
        required:true
    },
    posted_by : {
        type : String,
        required : true
    },
    posted_by_id : {
        type:Number,
        required:true
    },
    time : {
        type:Date,
        required:true
    },
    likes : {
        type:Number,
        default:0
    },
    likes_by : [
        {
            liked_by_id : {
                type:Number,
                required:true 
            },
            value:{
                type:Number,
                required:true
            }
        }
    ],
    comments : [
        {
            comment_id : {
                type:Number,
                required:true
            },
            message : {
                type:String,
                required:true
            },
            posted_by : {
                type : String,
                required : true
            },
            posted_by_id : {
                type:Number,
                required:true
            },
            time:{
                type:Date,
                required:true
            },
        }
    ],
    answer : [
        {
            answer_id : {
                type:Number,
                required:true 
            },
            ans : {
                type:String,
                required:true
            },
            posted_by : {
                type : String,
                required : true
            },
            posted_by_id : {
                type:Number,
                required:true
            },
            time : {
                type:Date,
                required:true
            },
            likes : {
                type:Number,
                default:0
            },
            is_expert : {
                type:Number,
                default:0
            },
            likes_by : [
                {
                    liked_by_id : {
                        type:Number,
                        required:true 
                    },
                    value:{
                        type:Number,
                        required:true
                    }
                }
            ],
            comments : [
                {
                    comment_id : {
                        type:Number,
                        required:true
                    },
                    message : {
                        type:String,
                        required:true
                    },
                    posted_by : {
                        type : String,
                        required : true
                    },
                    posted_by_id : {
                        type:Number,
                        required:true
                    },
                    time:{
                        type:Date,
                        required:true
                    }
                }
            ]
        }
    ]
}, {timestamps: true})

module.exports = mongoose.model('Question', questionSchema);
