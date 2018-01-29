const U = require('../../utils');

module.exports = {
    name: "removerole",
    execute: (msg, clargs) => {
        if (msg.channel.name === 'admin-bot-control') {
            let perms = U.GetPerms(msg.guild.name);

            for (let i = 1; i < clargs.length; i++)
                perms.hasOwnProperty(clargs[i]) ?
                    delete perms[clargs[i]] :
                    msg.channel.send(`\`\`\`Role: ${clargs[i]} doesn't exist!\`\`\``);

            return (() => {
                U.UpdatePerms(msg.guild.name, perms);
            })();
        }
    },
    description: "Removes role(s) from "
};