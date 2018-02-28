//Import Mongoose
let mongoose = require('mongoose');

// Define Permissions model
module.exports = mongoose.model('Permissions', new mongoose.Schema({
    guildId: String,
    guild: String,
    perms: String,
}), 'Permissions');