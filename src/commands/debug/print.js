const U = require('../../utils');
const fs = require('fs');

module.exports = {
        name: "print",
        execute: (msg, clargs, Perms) => {
                if (U.get_guild_member(msg.author, msg.guild).hasPermission("ADMINISTRATOR")) {
                        switch (clargs[0]) {
                                case 'perms':
                                        // let out = JSON.stringify(U.GetPerms(msg.guild.name));
                                        let out = JSON.stringify(Perms.getPerms(msg.guild.id));
                                        console.log(out);
                                        U.ChatResponse(msg, out);
                                        break;

                                // case 'perms-f':
                                //                 let out = JSON.stringify(JSON.parse(fs.readFileSync('./perms.json')));
                                //                 console.log(out);
                                //                 ChatResponse(msg, out);
                                //         break;


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

// module.exports = {
//         name: "print",
//         execute: (msg, clargs, perms) => {
//                 if (U.get_guild_member(msg.author, msg.guild).hasPermission("ADMINISTRATOR")) {
//                         switch (clargs[0]) {
//                                 case 'perms':
//                                         let out = JSON.stringify(U.GetPerms(msg.guild.name));
//                                         console.log(out);
//                                         U.ChatResponse(msg, out);
//                                         break;

//                                 // case 'perms-f':
//                                 //                 let out = JSON.stringify(JSON.parse(fs.readFileSync('./perms.json')));
//                                 //                 console.log(out);
//                                 //                 ChatResponse(msg, out);
//                                 //         break;

//                                 case 'roles':
//                                         let output = [];
//                                         for (let r of msg.guild.roles.array())
//                                                 output.push(r.name);

//                                         U.ChatResponse(msg, `Server role(s):\n${output.join("\n")}`);
//                                         break;
//                                 default:
//                                         U.ChatResponse(msg, `Unknown command!`);
//                                         break;
//                         }
//                 } else console.log("User is not an admin!");
//         },
//         description: "Command for printing debugging messages"
// };