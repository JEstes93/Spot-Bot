const U = require('../../utils');

module.exports = {
        name: "opt-out",
        execute: (msg, clargs, options) => {
                if (msg.channel.name === 'get-roles') {
                        const { Perms } = options;
                        let user = U.get_guild_member(msg.author, msg.guild);
                        // let perms = U.GetPerms(msg.guild.name);
                        let perms = Perms.getPerms(msg.guild.id);

                        //Return array of roles to opt-out of
                        let rarr = [];

                        for (let i = 0; i < clargs.length; i++) {
                                let _role = U.bHasRole(user.roles.array(), clargs[i]);
                                if (typeof _role != 'undefined' && _role)
                                        perms.hasOwnProperty(_role.name) ?
                                                rarr.push(_role) :
                                                U.ChatResponse(msg, `Cannot remove invalid role: ${_role.name}`);
                        }
                        return (() => {
                                if (rarr.length <= 0)
                                        U.ChatResponse(msg, `Invalid! No roles to remove!`);
                                else {
                                        user.removeRoles(rarr);
                                        let output = rarr.map(r => r.name);
                                        U.ChatResponse(msg, `Removed role(s): ${output.join(', ')} from user: ${user.displayName}`);
                                }
                        })();
                }
        },
        description: "Command that allows users to opt-out of applicable roles"
};