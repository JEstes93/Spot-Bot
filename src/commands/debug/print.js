const U = require('../../utils');

module.exports = {
        name: "print",
        execute: (msg, clargs) => {
                if (U.get_guild_member(msg.author, msg.guild).hasPermission("ADMINISTRATOR")) {
                        switch (clargs[0]) {
                                case 'perms':
                                        let out = JSON.stringify(U.GetPerms(msg.guild.name));
                                        console.log(out);
                                        U.ChatResponse(msg, out);
                                        break;

                                // case 'perms-f':
                                //                 let out = JSON.stringify(JSON.parse(fs.readFileSync('./perms.json')));
                                //                 console.log(out);
                                //                 ChatResponse(msg, out);
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