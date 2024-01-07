const express = require("express");
const router = express.Router();
const playlist = require("../data models/Playlists");
const passport = require("passport");

router.post("/add", passport.authenticate("jwt"), async(req,res) => {
    
    const {name, thumbnail} = req.body;

    const playlistObject = {name,thumbnail};

    const createdPlaylist = playlist.create(playlistObject);
    return res.status(200).json(createdPlaylist);
});