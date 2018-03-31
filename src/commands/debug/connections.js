const U = require('../../utils');

// const Discord = require('discord.js');
// const client = new Discord.Client();

module.exports = {
    name: "connections",
    execute: (msg, clargs, options) => {
        const { Perms } = options;

        msg.author.fetchProfile().then(profile => {
            U.ChatResponse(msg,
                `${profile.user.username}'s connections\n\n` +
                profile.connections.map(
                    e => `ID: ${e.id}\nNAME: ${e.name}\nTYPE: ${e.type}\nOWNER: ${e.user.username}\n\n`
                ).join('') + `Done!`
            );
        });

    },
    description: "Testing command for retrieving a user's connections on Discord"
};