const express = require("express");
const router = express.Router();
const User = require("../data models/Users");
const bcrypt = require("bcrypt");
const getToken = require("../utils/helper");

router.post("/signup", async(req,res) => {
    
    const {firstName, lastName, email, password, username} = req.body;

    const findEmail = await User.findOne({email: email});
    if(findEmail)
    {
        return res.status(403).json({error:"This email is already in use"});
    }

    const hashPwd = bcrypt.hash(password,10);
    const userObject = {
        firstName, 
        lastName, 
        email, 
        password : hashPwd, 
        username
    };

    const newUser = await User.create(userObject);

    const jwtToken = await getToken(email, newUser);
    const returnUser = {...newUser.toJSON(),jwtToken};
    delete returnUser.password;

    return res.status(200).json(returnUser);
})

router.get("/login",(req,res) => {

    const {email,password} = req.body;

    const findEmail = User.findOne({email: email});

    
    if(!findEmail)
    {
        return res.status(403).json({error: "User does not exist"});
    }

})

module.exports = router;