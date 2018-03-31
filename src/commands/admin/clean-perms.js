const U = require('../../utils');

module.exports = {
        name: "clean-perms",
        execute: (msg, clargs, options) => {
                if (msg.channel.name === 'admin-bot-control') {
                        const { Perms } = options;
                        let perms = Perms.getPerms(msg.guild.id);

                        for (let p in perms)
                                if (typeof msg.guild.roles.array().find(e => e.name === p) === 'undefined') {
                                        U.ChatResponse(msg, `${p} had no corresponding role, and was deleted.`);
                                        delete perms[p];
                                }

                        Perms.savePerms(msg.guild.id, perms);
                }
        },
        description: "Command that clears role permissions JSON of blank/useless entries"
};