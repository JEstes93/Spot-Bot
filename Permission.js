//Import Mongoose
let mongoose = require('mongoose');

// Define Permissions model
module.exports = mongoose.model('Permissions', new mongoose.Schema({
    guildId: String,
    guild: String,
    perms: String,
}), 'Permissions');


// module.exports = mongoose => {
//     mongoose.model('Permissions', new mongoose.Schema({
//         guildId: String,
//         guild: String,
//         perms: String,
//     }), 'Permissions');

//     return mongoose.model('Permissions');
// }

// module.exports = mongoose.model('Permissions', new mongoose.Schema({
//     guildId: 'number',
//     guild: 'object',
//     perms: 'object',
// }));