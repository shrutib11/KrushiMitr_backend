const express = require('express');
const multer = require('multer');
const path = require('path');
const CropDisease = require('../models/CropDisease');
const router = express.Router();
const ImgCounter = require('../models/ImgCounter');
const User = require('../models/User');


var img_upload_points = 10;
// Set up Multer for handling file uploads
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, callback) => {
        callback(null, 'image-' + Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

// Express route for uploading images
router.post('/upload', upload.single('image'), async (req, res) => {

    const {posted_by_id} = req.body; 
    const { curr_id } = await ImgCounter.findOne({ counter: "id" });
    const image_id = curr_id;

    try {
        const imageUrl = req.file.filename;

        await CropDisease.create({
            imageUrl: imageUrl,
            posted_by_id: posted_by_id,
            image_id: image_id
        });

        const imgcounter = await ImgCounter.findOneAndUpdate({ counter: "id" }, { "$inc": { "curr_id": 1 } });
        const rating = await User.findOneAndUpdate({ user_id: posted_by_id }, { "$inc": { "rating": img_upload_points } });
        res.json({ success: true, imageUrl: imageUrl, image_id: image_id});
        console.log(imgcounter);

    } catch (error) {
        console.log(error);
        res.json({ success: false });
    }
});

router.post('/addsolution', async (req, res) => {
    
    const {image_id, solution, disease} = req.body;

    try {
        const addsolution = await CropDisease.updateOne({image_id:image_id}, {$set: {solution : solution, disease:disease}});
        res.json({ success: true});
    } 
    catch (error) {
        console.log(error);
        res.json({ success: false });
    }
});

router.get("/profile/myimages", async(req, res) => {
    const user_id = req.query.user_id;
    const images = await CropDisease.find({"posted_by_id": user_id});
    res.status(200).json(images);
})

module.exports = router;