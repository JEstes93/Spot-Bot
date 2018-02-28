const U = require('../../utils');

module.exports = {
    name: "avail",
    execute: (msg, clargs, Perms) => {
        if (msg.channel.name === 'get-roles' || msg.channel.name === 'admin-bot-control') {
            let perms = Perms.getPerms(msg.guild.id);
            let responseText = '';

            for (let p in perms) {
                responseText += `${p}\t`;
                for (let el of perms[p]) {
                    responseText += `${el}, `;
                }
                responseText += `\n`;
            }

            U.ChatResponse(msg, `Role(s)\tRequired role(s) to opt-in\n${responseText}`);
        }
    },
    description: "Displays roles available for opting into, and any roles that may be required to do so."
};