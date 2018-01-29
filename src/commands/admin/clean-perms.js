const U = require('../../utils');

module.exports = {
        name: "clean-perms",
        execute: (msg, clargs) => {
                if (msg.channel.name === 'admin-bot-control') {
                        let perms = U.GetPerms(msg.guild.name);
                        for (let p in perms)
                                if (typeof msg.guild.roles.array().find(e => e.name === p) === 'undefined') {
                                        U.ChatResponse(msg, `${p} had no corresponding role, and was deleted.`);
                                        delete perms[p];
                                }

                        U.UpdatePerms(msg.guild.name, perms);
                }
        },
        description: "Command that clears role permissions JSON of blank/useless entries"
};