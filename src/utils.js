const fs = require('fs');

/**
 * Ensures that directories exist, and creates them if not
 * @param {String} dir Directory to check/create
 * @param {Function} cb Callback Fn()
 */
function ensure_directory(dir, cb) {
    if (typeof dir === 'string' && dir) {
        // fs.stat(dir, (err, stats) => err ? fs.mkdirSync(dir) : console.error(err));
        if (!fs.existsSync(dir))
            fs.mkdirSync(dir);

        if (cb)
            cb(dir + '/');
    } else if (Array.isArray(dir) && dir) {
        fs.statSync('./' + dir.splice(0, 1), (err, stats) => err ? fs.mkdirSync(dir) : console.error(err));
    }
}

//Confirms that bot has permissions for assigning a role
/**
 * Deprecated! - bHasRole is a more robust solution
 * @param {String} dir Directory to check/create
 * @param {Function} cb Callback Fn()
 */
const bCheckPerms = (msg, role) => {
    for (let r of msg.guild.roles.array()) {
        console.log("Checkperms: " + r.name);
        if (r.name === role)
            return true;
    }
    return false;
}

/**
 * Searches bot permissions to ensure user is authorized to opt-in
 * @param {Array} arr Array of requesting user's roles
 * @param {String} role Name of requested role
 * @param {Object} perms Guild's perms
 * @param {Boolean}
 */
const bCanOptIn = (arr, role, perms) => {
    for (let r of arr)
        if (!perms.hasOwnProperty(role))
            return false;
        else if (Array.isArray(perms[role]))
            if (perms[role].length <= 0)
                return true;
            else
                for (let dr of perms[role])
                    if (r.name === dr)
                        return true;

    return false;
}

/**
 * Searches array for matching role by name and returns result, returns false if no matches
 * @param {Array} arr Array of requesting user's roles
 * @param {String} role Name of requested role
 * @param {Role}
 */
const bHasRole = (arr, role) => {
    for (let r of arr)
        if (r.name === role)
            return r;

    return false;
}

//Easy bot response decoration
/**
 * Easy bot response decoration
 * @param {Message} msg Message to respond to
 * @param {String} res Text response
 * @param {Void}
 */
const ChatResponse = (msg, res) => {
    msg.channel.send(`\`\`\`${res}\`\`\``);
}

/**
 * Ensures Message is properly identified as command
 * @param {Message} msg Message to respond to
 * @param {Boolean}
 */
const bHasCommandSignature = msg => {
    if (msg.content[0] === 'c' && msg.content[1] === '!')
        return true;
    else return false;
}

/**
 * Retrieves bot-managed roles and permissions from JSON file. Returns data as object or false if nothing found
 * @param {String} guild_name Name of guild to retrieve data for
 * @return {Object}
 */
const GetPerms = (guild_name) => {
    if (fs.existsSync(`./storage/guilds/${guild_name}/perms.json`)) {
        return JSON.parse(fs.readFileSync(`./storage/guilds/${guild_name}/perms.json`));
    } else {
        console.log("No file found!");
        console.log(`Searched: ./storage/guilds/${guild_name}/perms.json`);
        return false;
    }
}

/**
 * Writes data storing bot-managed roles and permissions to JSON file
 * @param {String} guild_name Name of guild to retrieve data for
 * @param {Object} perms Suggestion 
 * @return {Void}
 */
const UpdatePerms = (guild_name, perms) => {
    fs.writeFileSync(`./storage/guilds/${guild_name}/perms.json`, JSON.stringify(perms));
    console.log("Permissions Updated!");
}

/**
 * Retrieves bot suggestions from JSON file. Returns data as object or false if nothing found
 * @param {String} guild_name Name of guild to retrieve data for
 * @return {Object}
 */
const GetSuggestions = (guild_name) => {
    if (fs.existsSync(`./storage/guilds/${guild_name}/suggestions.json`)) {
        return JSON.parse(fs.readFileSync(`./storage/guilds/${guild_name}/suggestions.json`));
    } else {
        console.log("No file found!");
        console.log(`Searched: ./storage/guilds/${guild_name}/suggestions.json`);
        return false;
    }
}

/**
 * Writes suggestions to JSON file
 * @param {String} guild_name Name of the guild being affected
 * @param {Object} suggest Suggestions object
 * @return {Void}
 */
const UpdateSuggest = (guild_name, suggest) => {
    fs.writeFileSync(`./storage/guilds/${guild_name}/suggestions.json`, JSON.stringify(suggest));
    console.log("Suggestions Updated!");
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

/**
 * Creator security
 * @param {String} id ID to confirm
 */
const safetyfire = id => id === '141304924880240640' ? true : false;

module.exports = {

    /**
 * Creator security
 * @param {String} id ID to confirm
 */
    safetyfire: safetyfire,

    /**
 * Ensures that directories exist, and creates them if not
 * @param {String} dir Directory to check/create
 * @param {Function} cb Callback Fn()
 */
    ensure_directory: ensure_directory,

    /**
 * Ensures that directories exist, and creates them if not
 * @param {String} dir Directory to check/create
 * @param {Function} cb Callback Fn()
 */
    bCheckPerms: bCheckPerms,

    //Searches bot permissions to ensure user is authorized to opt-in
    /**
 * Ensures that directories exist, and creates them if not
 * @param {Array} arr Array of current user roles
 * @param {String} role Name of the requested role
 * @returns {Boolean}
 */
    bCanOptIn: bCanOptIn,

    /**
     * Searches array for matching role by name and returns result, returns false if no matches
     * @param {Array} arr Array of requesting user's roles
     * @param {String} role Name of requested role
     * @param {Role}
     */
    bHasRole: bHasRole,

    /**
 * Easy bot response decoration
 * @param {Message} msg The message that triggered this logic
 * @param {String} res Text response for bot to send
 */
    ChatResponse: ChatResponse,


    bHasCommandSignature: bHasCommandSignature,

    /**
 * Retrieves bot-managed roles and permissions from JSON file. Returns data as object or false if nothing found
 * @param {String} guild_name Name of guild to retrieve data for
 * @return {Object}
 */
    GetPerms: GetPerms,

    /**
 * Writes data storing bot-managed roles and permissions to JSON file
 * @param {String} guild_name Name of guild to retrieve data for
 * @param {Object} perms Suggestion 
 * @return {Void}
 */
    UpdatePerms: UpdatePerms,

    /**
 * Retrieves bot suggestions from JSON file. Returns data as object or false if nothing found
 * @param {String} guild_name Name of guild to retrieve data for
 * @return {Object}
 */
    GetSuggestions: GetSuggestions,

    /**
 * Writes suggestions to JSON file
 * @param {String} guild_name Name of the guild being affected
 * @param {Object} suggest Suggestions object
 * @return {Void}
 */
    UpdateSuggest: UpdateSuggest,

    /**
 * Returns the guild member object from user object
 * @param {User} user User object to search
 * @param {Guild} guild Guild to search
 * @return {GuildMember}
 */
    get_guild_member: get_guild_member,

    /**
 * Just a test method, logs input string to console
 * @param {String} msg string to log
 * @return {Void}
 */
    test: (msg) => console.log(msg)
};