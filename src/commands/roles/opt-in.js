const U = require('../../utils');

module.exports = {
        name: "opt-in",
        execute: (msg, clargs) => {
                if (msg.channel.name === 'get-roles') {
                        let user = U.get_guild_member(msg.author, msg.guild);
                        let perms = U.GetPerms(msg.guild.name);
                        if (typeof perms != 'undefined' && perms) {
                                for (let i = 0; i < clargs.length; i++) {
                                        let _role = U.bHasRole(msg.guild.roles.array(), clargs[i]);
                                        if (typeof _role != 'undefined' && _role) //Check that user is opting into an existing role
                                                if (U.bCanOptIn(user.roles.array(), _role.name, perms)) { //Check that role is opt-able, and that user has any required roles
                                                        user.addRole(_role);
                                                        U.ChatResponse(msg, `${user.displayName} has been assigned the role: ${clargs[i]}`);
                                                } else U.ChatResponse(msg, `${user.displayName} is not authorized to opt-in to the role: ${clargs[i]}`);
                                        else U.ChatResponse(msg, `Unknown role: ${clargs[i]}`);
                                }
                        } else U.ChatResponse(msg, "Couldn't find perms file!");
                } else U.ChatResponse(msg, "Please use this command in the appropriate channel: #get-roles");
        },
        description: "Verifies user may opt into a given role, and if so, grants them the role"
};