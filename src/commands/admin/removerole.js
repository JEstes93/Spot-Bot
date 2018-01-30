const U = require('../../utils');

module.exports = {
    name: "removerole",
    execute: (msg, clargs) => {
        if (msg.channel.name === 'admin-bot-control') {
            let perms = U.GetPerms(msg.guild.name);

            for (let i = 0; i < clargs.length; i++)
                if (perms.hasOwnProperty(clargs[i])) {
                    delete perms[clargs[i]];
                    U.ChatResponse(msg, `Permissions removed for role: ${clargs[i]}`);
                } else U.ChatResponse(msg, `No permissions for role: ${clargs[i]}`);
            return U.UpdatePerms(msg.guild.name, perms);
        }
    },
    description: "Removes role(s) from bot-managed list"
};