const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');

const P = require('./str-parse/cli-parser');

const perms = JSON.parse(fs.readFileSync('./perms.json'));
const suggest = JSON.parse(fs.readFileSync('./suggestions.json'));

client.on('ready', () => {
    client.user.setUsername("SpottaDot The Copi Bot");

    console.log('Logged in as ' + client.user.tag + '!');

    ensure_directory('./storage', p => {
        client.guilds.forEach(g => {
            ensure_directory(p + g.name);
        });
    });

    // client.guilds.forEach(g => {
    //     if (!get_guild_member(client.user, g).hasPermission("ADMINISTRATOR")) {
    //         return new Discord.TextChannel(g, g.channels.find(e => {
    //             if (e.type === 'text')
    //                 return e;
    //         })).send('```I require Administrator status to enable my full functionality.```');
    //     }
    // });
});

/**
 * Ensures that directories exist, and creates them if not
 * @param {String} dir Directory to check/create
 * @param {Function} cb Callback Fn()
 */
function ensure_directory(dir, cb) {
    fs.stat(dir, (err, stats) => err ? fs.mkdir(dir) : console.error(err));

    if (cb)
        cb(dir + '/');
}

client.on('message', msg => {

    if (msg.system)
        return console.log("Performance Saved!");
    else if (msg.channel.name != 'get-roles' && msg.channel.name != 'admin-bot-control' && msg.channel.name != 'bot-suggestions')
        return console.log("Performance Saved!");
    else if (bHasCommandSignature(msg) != true)
        return console.log(bHasCommandSignature(msg));
    else {

    //Parse for strings in quotation marks here
    let clargs = P.parse(msg.content);
    console.log(clargs);

    // let clargs = msg.content.split('!')[1].split(' ');

    switch (clargs[0]) {
        //Opt-In
        case 'opt':
            if (msg.channel.name === 'get-roles') {
                let user = get_guild_member(msg.author, msg.guild);

                for (let i = 1; i < clargs.length; i++) {
                    let _role = bHasRole(msg.guild.roles.array(), clargs[i]);
                    if (typeof _role != 'undefined' && _role) //Check that user is opting into an existing role
                        if (bCanOptIn(user.roles.array(), _role.name)) { //Check that role is opt-able, and that user has any required roles
                            user.addRole(_role);
                            ChatResponse(msg, `${user.displayName} has been assigned the role: ${clargs[i]}`);
                        } else
                            ChatResponse(msg, `${user.displayName} is not authorized to opt-in to the role: ${clargs[i]}`);
                    else
                        ChatResponse(msg, `Unknown role: ${clargs[i]}`);
                }
            } else
                ChatResponse(msg, "Please use this command in the appropriate channel: #get-roles");
            break;

        //Opt-Out
        case 'opt-out':
            if (msg.channel.name === 'get-roles') {
                let user = get_guild_member(msg.author, msg.guild);
                let rarr = [];

                for (let i = 1; i < clargs.length; i++) {
                    let _role = bHasRole(user.roles.array(), clargs[i]);
                    if (typeof _role != 'undefined' && _role)
                        if (perms.hasOwnProperty(_role.name))
                            rarr.push(_role);
                        else
                            ChatResponse(msg, `Cannot remove invalid role: ${_role.name}`);

                    return (() => {
                        if (rarr.length <= 0)
                            ChatResponse(msg, `Invalid! No roles to remove!`);
                        else {
                            user.removeRoles(rarr);
                            let output = rarr.map(r => r.name);
                            ChatResponse(msg, `Removed role(s): ${output.join(' ')} from user: ${user.displayName}`);
                        }
                    })();
                }
            }
            break;

        case 'suggest':
            if (msg.channel.name === 'bot-suggestions') {
                let d = new Date();
                suggest.suggestions.push({
                    "author": get_guild_member(msg.author, msg.guild).displayName,
                    "date": `${d.getMonth()}/${d.getDate()}/${d.getFullYear()}`,
                    "msg": clargs.map((e, i) => { if (i > 0) return e; }).join(' ') //.toString()
                });
                return UpdateSuggest();
            }
            break;

        //Administrative
        case 'addrole':
            if (msg.channel.name === 'admin-bot-control') {

                let auto = clargs.find((e, ind) => {
                    if (e === '-t') {
                        clargs.splice(ind, 1);
                        return e;
                    }
                });

                let propName = clargs[1];
                let propArr = [];

                console.log("Auto 1: " + auto);

                let serverRole = bHasRole(msg.guild.roles.array(), propName);

                if (typeof serverRole === 'undefined' || !serverRole)
                    if (typeof auto != 'undefined' && auto)
                        msg.guild.createRole({
                            'name': propName
                        }).then(res => { ChatResponse(msg, `New blank role created: ${res.name}!\nDon't forget to configure this role!`); }, rej => console.error(rej));
                    else
                        return ChatResponse(msg, `No corresponding role on server: ${propName}`);

                console.log("Auto 2: " + auto);

                // else {
                if (clargs.length <= 2)
                    ChatResponse(msg, `Role added with open permissions: ${propName}`);
                else {
                    for (let i = 2; i < clargs.length; i++) {
                        let _role = bHasRole(msg.guild.roles.array(), clargs[i]);
                        console.log(_role);

                        if (typeof _role != 'undefined' || _role) {
                            propArr.push(_role.name);
                        } else
                            msg.channel.send(`\`\`\`Role: ${_role.name} doesn't exist! Cannot create parameters! \`\`\``);
                    }
                }
                return (() => {
                    perms[propName] = propArr;
                    UpdatePerms();
                })();
                // }
            }
            break;

        // case 'editrole':???

        case 'removerole':
            if (msg.channel.name === 'admin-bot-control') {
                for (let i = 1; i < clargs.length; i++) {
                    console.log(clargs[i]);
                    if (perms.hasOwnProperty(clargs[i]))
                        delete perms[clargs[i]];
                    else
                        msg.channel.send(`\`\`\`Role: ${clargs[i]} doesn't exist!\`\`\``);
                }

                return (() => {
                    UpdatePerms();
                })();
            }
            break;

        case 'clean_perms':
            if (msg.channel.name === 'admin-bot-control') {
                for (let p in perms)
                    if (typeof msg.guild.roles.array().find(e => e.name === p) === 'undefined') {
                        ChatResponse(msg, `${p} had no corresponding role, and was deleted.`);
                        delete perms[p];
                    }

                return UpdatePerms();
            }
            break;

        //Debugging
        case 'print':
            switch (clargs[1]) {
                case 'perms':
                    if (get_guild_member(msg.author, msg.guild).hasPermission("ADMINISTRATOR")) {
                        let out = JSON.stringify(perms);
                        console.log(out);
                        ChatResponse(msg, out);
                    }
                    break;

                case 'perms-f':
                    if (get_guild_member(msg.author, msg.guild).hasPermission("ADMINISTRATOR")) {
                        let out = JSON.stringify(JSON.parse(fs.readFileSync('./perms.json')));
                        console.log(out);
                        ChatResponse(msg, out);
                    }
                    break;

                case 'roles':
                    if (get_guild_member(msg.author, msg.guild).hasPermission("ADMINISTRATOR")) {
                        let output = [];
                        for (let r of msg.guild.roles.array()) {
                            console.log(r.name);
                            output.push(r.name);
                        }

                        return (() => {
                            ChatResponse(msg, `Server role(s):\n${output.join("\n")}`);
                        })();
                    }
                    break;
                default:
                    break;
            }
            break;
        //Help messages
        case 'help':
            switch (msg.channel.name) {
                case 'get-roles':
                    ChatResponse(msg, "Help\tCommands\n" +
                        "c!opt [...list of roles...]\nCommand will attempt to opt into roles, in order, until the end of a space-separated list.\n\n" +
                        "c!opt-out [...list of roles...]\nCommand will attempt to opt out of roles, in order, until the end of a space-separated list.\n\n");
                    break;
                case 'admin-bot-control':
                    ChatResponse(msg, "Admin\tCommands\n" +
                        "c!addrole [role] [...list of roles required to opt-in...] [arg]\nCommand will add a role to get-roles. A following space-seperated list will define any roles that may opt into this role. A blank list will make the role available to anyone. Placing the optional argument '-t' anywhere in this command will auto-create a blank server role with the same name.\n\n" +
                        // "c!editrole [role] [...list of roles required to opt-in]\nCommand will attempt to opt into roles, in order, until the end of a space-separated list\n\n" +
                        "c!removerole [...list of roles to be removed...]\nCommand will remove roles from get-roles, in order, until the end of a space-separated list.\n\n" +
                        "c!print [arg]\nCommand will print information about the bot. Valid args:\n" +
                        "perms\t  Prints role permissions in JSON.\nperms-f\tPrints real-time contents of bot's role permissions JSON file.\nroles\t  Prints all roles visible to bot, server-wide.\n\n" +
                        "c!clean_perms\nCommand will check that all role permissions have a corresponding role. If not, the permissions will be deleted.\n");
                    break;
                case 'bot-suggestions':
                    ChatResponse(msg, "Suggest\tFeatures\n" +
                        "c!suggest [full suggestion text]\nCommand will record suggestions for the improvement of the bot. Any text after the command will be included as the suggestion text. Be descriptive!\n\n"
                    );
                    break;
            }
            break;
    }

    if (clargs[clargs.length - 1] === '-h')
        msg.delete();
    }
});

//Confirms that bot has permissions for assigning a role
const bCheckPerms = (msg, role) => {
    for (let r of msg.guild.roles.array()) {
        console.log("Checkperms: " + r.name);
        if (r.name === role)
            return true;
    }
    return false;
}

//Searches bot permissions to ensure user is authorized to opt-in
const bCanOptIn = (arr, role) => {
    for (let r of arr)
        if (!perms.hasOwnProperty(role))
            return false;
        else if (Array.isArray(perms[role]))
            if (perms[role].length <= 0)
                return true;
            else
                for (let dr of perms[role])
                    if (r.name === dr) //if (r.name === dr)
                        return true;

    return false;
}

//Searches array for matching role by name and returns result, returns false if no matches
const bHasRole = (arr, role) => {
    for (let r of arr)
        if (r.name === role)
            return r;

    return false;
}

//Easy bot response decoration
const ChatResponse = (msg, res) => {
    msg.channel.send(`\`\`\`${res}\`\`\``);
}

//Ensures Message is properly identified as command
const bHasCommandSignature = msg => {
    if (msg.content[0] === 'c' && msg.content[1] === '!')
        return true;
    else return false;
}

//Maybe pointless code...
const bGuildHasRole = (msg, role) => {
    for (let r of msg.guild.roles.array())
        if (r.name === role)
            return true;

    return false;
}

//Writes permissions to JSON file
const UpdatePerms = () => {
    fs.writeFileSync('./perms.json', JSON.stringify(perms));
    console.log("Permissions Updated!");
}

//Writes suggestions to JSON file
const UpdateSuggest = () => {
    fs.writeFileSync('./suggestions.json', JSON.stringify(suggest));
    console.log("Suggestions Updated!");
}

/**
 * Creator security
 * @param {String} id ID to confirm
 */
function safetyfire(id) {
    if (id === '141304924880240640')
        return true;
    else
        return false;
}

/**
 * Returns the guild member object from user object
 * @param {User} user User object to search
 * @param {Guild} guild Guild to search
 * @return {GuildMember}
 */
function get_guild_member(user, guild) {
    return guild.members.array().find(e => { if (e.user === user) return e; });
}

// console.log(JSON.parse(fs.readFileSync('./_secure.json')).token);
client.login(JSON.parse(fs.readFileSync('./_secure.json')).token);

// /**
//  * Handles Bot commands
//  * @param {Message} msg Message Object of command
//  */
// function handle(msg) {