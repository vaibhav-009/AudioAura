const mongoose = require("mongoose");

const Playlist = new mongoose.Schema({
    
    name: {
        type: String,
        required: true
    },
    thumbanail: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: "user"
    },
    songs: [{
        type: mongoose.Types.ObjectId,
        ref: "song"
    }],
    collaborator: {
        type: mongoose.Types.ObjectId,
        ref: "user"
    }
});

const PlaylistModel = mongoose.model("Playlist",Playlist);
module.exports= PlaylistModel;