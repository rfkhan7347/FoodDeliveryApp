const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs');
const jwt= require('jsonwebtoken')
const jwtSecret = "ThisisajwtSecretkeygeneratedforsecurity##"


router.post("/createuser", [body('email').isEmail().isLength({max:20}), body('name').isLength({ min: 1 }),
    body('email').custom(async (value) => {
    const user = await User.findOne({ email: value });
    if (user) {
      return Promise.reject('Email already exists');
    }
    }), 
    body('password', 'Incorrect Password!!').isLength({ min: 5 })], async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(422).json({ error: error.array() });
    }
    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password,salt);


    try {
        await User.create({
            name: req.body.name,
            password: secPassword,
            email: req.body.email,
            location: req.body.location
        })
        res.json({ success: true });
    } catch (error) {
        console.log(error);
        res.json({ success: false });
    }
})

router.post("/loginuser", [body('email').isEmail(), body('password', 'Incorrect Password!!').isLength({ min: 5 })], async (req, res) => {
    let success = false;
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(422).json({ error: error.array() });
    }
    let email = req.body.email;
    try {
        let userData = await User.findOne({email})
        if (!userData) {
            console.log("No such user!!")
            return res.status(400).json({success, error: "Incorrect credentials!!!" });
        }

        const pwdCompare = await bcrypt.compare(req.body.password, userData.password)
        
        if (!pwdCompare) {
            console.log("Incorrect password!!")
            return res.status(400).json({ success,error: "Incorrect credentials!!!" });
        }

        const data = {
            user:{
            id: userData.id     
            }
        }
        success = true;
        const authToken = jwt.sign(data,jwtSecret)
        res.json({ success,authToken:authToken });

    } catch (error) {
        console.log(error);
        res.json({ success: false });
    }
})

module.exports = router;