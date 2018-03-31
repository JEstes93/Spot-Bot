const U = require('../../utils');

module.exports = {
        name: "print",
        execute: (msg, clargs, options) => {
                if (U.get_guild_member(msg.author, msg.guild).hasPermission("ADMINISTRATOR")) {
                        const { Perms } = options;
                        switch (clargs[0]) {
                                case 'perms':
                                        let out = JSON.stringify(Perms.getPerms(msg.guild.id));
                                        U.ChatResponse(msg, out);
                                        break;

                                // case 'models':
                                //         //Test line - remove after debugging
                                //         Perms.listModels();
                                //         break;

                                // case 'logPM':
                                //         fs.writeFile('./PMoutput.json', JSON.stringify(Perms));
                                //         break;

                                case 'roles':
                                        let output = [];
                                        for (let r of msg.guild.roles.array())
                                                output.push(r.name);

                                        U.ChatResponse(msg, `Server role(s):\n${output.join("\n")}`);
                                        break;
                                default:
                                        U.ChatResponse(msg, `Unknown command!`);
                                        break;
                        }
                } else console.log("User is not an admin!");
        },
        description: "Command for printing debugging messages"
};