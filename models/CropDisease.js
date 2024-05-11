const mongoose = require('mongoose');
const { Schema } = mongoose;  

const CropDisease = new Schema({
    image_id : {
        type : Number,
        required : true
    },
    posted_by_id : {
        type : Number,
        required : true
    },
    imageUrl: {
        type: String, // Binary data for the image
        required: true,
    },
    solution : {
        type : String
    },
    disease : {
        type: String
    }
    // contentType: {
    //     type: String, // MIME type of the image (e.g., 'image/jpeg')
    //     required: true,
    // },
});

module.exports = mongoose.model('CropDisease', CropDisease);