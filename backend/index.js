const mongoose = require("mongoose");
const express = require("express");
require("dotenv").config();
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require("passport");
const User = require("./data models/Users");
const app = express();
const port = 6000;
app.use(express.json());
const authRoute = require("./routes/register");
const songRoute = require("./routes/song");

//Code to setup JWT authentication

let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "ThisIsOurKey";
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.sub}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
}));

//Connect the backend to mongoDB

mongoose.connect("mongodb+srv://admin:"+ process.env.DB_PASSWORD +"@audio-cluster.5y7s8fi.mongodb.net/",
                {
                    useNewURLParser: true,
                    useUnifiedTopology: true
                })
                .then((x) => {
                    console.log("Connected Successfully")
                })
                .catch((err) =>{
                    console.log(err);
                });

app.use("/auth",authRoute);
app.use("/song",songRoute);

app.get("/", (req,res)=>{
    res.send("Hello world")
});

app.listen(port,() => {
    console.log("app is running on port "+port)
});