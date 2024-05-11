const express = require('express')
const router = express.Router()
const User = require('../models/User')
const UserCounter = require('../models/UserCounter')
const { body, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const bcrypt = require("bcryptjs")
const jwtSecret = "ThisIsMyFirstMernProject$$$$$$$$"

router.post("/createuser", [

    //validation
    body("email", "Incorrect Email").isEmail(),
    //password must be at least 5 length
    body("password", "Incorrect Password").isLength({ min: 5 })],

    async (req, res) => {                         //endpoint
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        //bcrypt is a hashing algorithm
        const salt = await bcrypt.genSalt(10);                  //random value which is combined with the password before password is hashed
        let securePassword = await bcrypt.hash(req.body.password, salt)

        const { curr_id } = await UserCounter.findOne({ counter: "id" });
        const user_id = curr_id;

        const alreadyUser = await User.findOne({email:req.body.email});
        if(alreadyUser){
            res.json("Email Already Registered");
        }
        
        try {
            await User.create({
                user_id: user_id,
                user_name: req.body.user_name,
                email: req.body.email,
                password: securePassword,
                user_type: req.body.user_type
            })
            res.json({ success: true });
            const usercounter = await UserCounter.findOneAndUpdate({counter:"id"},{"$inc":{"curr_id":1}});
        } catch (error) {
            console.log(error);
            res.json({ success: false });
        }

        
    })

router.post("/loginuser", 

    async (req, res) => {                         //endpoint
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let email = req.body.email;                       //endpoint
        try {
            let userData = await User.findOne({ email:email });
            if (!userData) {
                return res.status(400).json({ errors: "try logging with correct credentials" });
            }

            const passwordCompare = await bcrypt.compare(req.body.password, userData.password)//because userData.password is in hash format encrpted.

            if (!passwordCompare) {
                return res.status(400).json({ errors: "try logging with correct credentials" });
            }

            //we will send a authorization token to save in user side by sending id from db
            const data = {
                user: {
                    id: userData.id
                }
            }

            //jab tak user cache clear nahi karega tab tak ye data nahi jayega(we can also add expirydate here)
            const authToken = jwt.sign(data, jwtSecret)
            const username = userData.user_name;
            const userid = userData.user_id;
            const role = userData.user_type;
            return res.json({ success: true, authToken: authToken, username:username, userid : userid, role:role });

        }
        catch (error) {
            console.log(error);
            res.json({ success: false });
        }
    }
)

module.exports = router;
