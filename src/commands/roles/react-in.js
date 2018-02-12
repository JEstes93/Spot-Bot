const U = require('../../utils');
const discord = require('discord.js');

        module.exports = {
                name: "react-in",
                execute: (msg, clargs) => {
                        if (msg.channel.name = 'get-roles') {
                                // if(U.b)
                                const filter = (reaction, user) => reaction.emoji.name != null;
                                const collector = msg.createReactionCollector(filter);
                                collector.on('collect', r => {
                                        // let user = U.get_guild_member(msg.author, msg.guild);
                                        // let perms = U.GetPerms(msg.guild.name);
                                        // if (typeof perms != 'undefined' && perms) {
                                        //         for (let i = 0; i < clargs.length; i++) {
                                        //                 let _role = U.bHasRole(msg.guild.roles.array(), clargs[i]);
                                        //                 if (typeof _role != 'undefined' && _role) //Check that user is opting into an existing role
                                        //                         if (U.bCanOptIn(user.roles.array(), _role.name, perms)) { //Check that role is opt-able, and that user has any required roles
                                        //                                 user.addRole(_role);
                                        //                                 U.ChatResponse(msg, `${user.displayName} has been assigned the role: ${clargs[i]}`);
                                        //                         } else U.ChatResponse(msg, `${user.displayName} is not authorized to opt-in to the role: ${clargs[i]}`);
                                        //                 else U.ChatResponse(msg, `Unknown role: ${clargs[i]}`);
                                        //         }
                                        // } else U.ChatResponse(msg, "Couldn't find perms file!");

                                        console.log(r.emoji);
                                });
                        }
                },
                description: ""
            };