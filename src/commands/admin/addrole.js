const U = require('../../utils');

module.exports = {
    name: "addrole",
    execute: (msg, clargs, options) => {
        if (msg.channel.name === 'admin-bot-control') {
            const { Perms } = options;
            let perms = Perms.getPerms(msg.guild.id);

            //For auto-creating role
            let auto = clargs.find((e, ind) => {
                if (e === '-t') {
                    clargs.splice(ind, 1);
                    return e;
                }
            });

            let propName = clargs[0];
            let propArr = [];
            let serverRole = U.bHasRole(msg.guild.roles.array(), propName);

            if (typeof serverRole === 'undefined' || !serverRole)
                if (typeof auto != 'undefined' && auto){
                    msg.guild.createRole({
                        'name': propName
                    }).then(res => { 
                        U.ChatResponse(msg, `New blank role created: ${res.name}!\nDon't forget to configure this role!`); 
                    }, rej => console.error(rej));
                } else return U.ChatResponse(msg, `No corresponding role on server: ${propName}`);

            if (clargs.length < 2)
                U.ChatResponse(msg, `Role added with open permissions: ${propName}`);
            else {
                for (let i = 1; i < clargs.length; i++) {
                    let _role = U.bHasRole(msg.guild.roles.array(), clargs[i]);

                    if (typeof _role != 'undefined' || _role) {
                        propArr.push(_role.name);
                    } else
                        U.ChatResponse(msg, `Role: ${_role.name} doesn't exist! Cannot create parameters!`);
                }
            }
            return (() => {
                perms[propName] = propArr;
                Perms.savePerms(msg.guild.id, perms);
                U.ChatResponse(msg, `Role added: ${propName}`);
            })();
        }
    },
    description: "Adds role and permissions to bot management"
};