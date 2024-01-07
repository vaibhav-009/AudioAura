const express = require("express");
const router = express.Router();
const song = require("../data models/Songs");
const passport = require("passport");

router.post("/add", passport.authenticate("jwt", {session :false}), async (req,res) => {

    const {name ,thumbnail, track} = req.body;
    const artist = req.user.__id;

    if(!name || !thumbnail || !track)
    {
        return res.status(301).json({error :"Incompleted details"});
    }

    const songObject = { name, thumbnail, track, artist }
    const createdSong = await song.create(songObject);
    return res.status(200).json(createdSong);
})

router.get("/read", passport.authenticate("jwt", {session: false}), async(req,res) =>{

    
})

module.exports = router;