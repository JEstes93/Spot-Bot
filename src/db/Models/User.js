//Import Mongoose
let mongoose = require('mongoose');

// Define Permissions model
module.exports = mongoose.model('User', new mongoose.Schema({
    spotifyId: String,
    spotifyUri: String,
    spotifyType: String,
    spotifyPlaylists: String,
    discordId: String,
    discordUserName: String
}), 'Users');