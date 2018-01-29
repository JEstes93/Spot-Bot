const U = require('../../utils');

module.exports = {
        name: "suggest",
        execute: (msg, clargs) => {
                if (msg.channel.name === 'bot-suggestions') {
                        let suggest = U.GetSuggestions(msg.guild.name);
                        let d = new Date();
                        suggest.suggestions.push({
                                "author": U.get_guild_member(msg.author, msg.guild).displayName,
                                "date": `${d.getMonth()}/${d.getDate()}/${d.getFullYear()}`,
                                "msg": clargs.join(' ')
                                // "msg": clargs.map((e, i) => { if (i > 0) return e; }).join(' ') //.toString()
                        });
                        U.UpdateSuggest(msg.guild.name, suggest);
                        U.ChatResponse(msg, "Thanks for your input!");
                }
        },
        description: "",
};