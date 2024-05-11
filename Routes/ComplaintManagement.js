const express = require('express');
const router = express.Router();
const User = require("../models/User");
const ComplaintCounter = require("../models/ComplaintCounter");
const Complaint = require("../models/Complaint");
const nodemailer = require('nodemailer');

const complaint_resolved_points = 10;

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'krushimitra1123@gmail.com',
        pass: 'nedd bpar xdfn pmkb'
    }
});

router.post("/file-complaint", async(req, res) => {
    const { curr_id } = await ComplaintCounter.findOne({ counter: "id" });
    const complaint_id = curr_id;
    const {posted_by_id, posted_by, message} = req.body;
    try {
        const complaint = await Complaint.create({ complaint_id, message, posted_by, posted_by_id });
        const complaintcounter = await ComplaintCounter.findOneAndUpdate({ counter: "id" }, { "$inc": { "curr_id": 1 } });
        res.status(200).json(complaint);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get("/all-complaints", async(req, res) => {
    const user_id = req.query.user_id;
    try {
        const complaints = await Complaint.find({posted_by_id:user_id});
        res.status(200).json(complaints);
    } 
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get("/fetch-all-complaints" , async(req, res) => {
    try{
        const complaints = await Complaint.find({status:"Pending"});
        res.status(200).json(complaints);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.post("/update-status", async(req, res) => {
    const {complaint_id, steps_taken, user_id} = req.body;
    
    try{
        const resolve = await Complaint.findOneAndUpdate({complaint_id:complaint_id}, {$set : {"status" : "Resolved", "steps_taken" : steps_taken}});
        const {email} = await User.findOne({user_id:resolve.posted_by_id});
        // const updatepoints = await User.findOneAndUpdate({user_id:user_id}, {"$inc" : {rating:complaint_resolved_points}});
        const rating = await User.findOneAndUpdate({user_id:user_id},{"$inc":{"rating":complaint_resolved_points}});
        let mailOptions = {
            from: 'krushimitra1123@gmail.com',
            to: email,
            subject: 'Regarding Complaint Resolving',
            text: 'The Complaint Registered by you on our portal with the following content ' + resolve.message + ', has been Resolved Successfully. We have taken the following steps : ' + steps_taken
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error occurred:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });
        const complaints = await Complaint.find({status:"Pending"}); 
        return res.status(200).json({complaints:complaints, message:"Complaint Resolved"});
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
})


module.exports = router;