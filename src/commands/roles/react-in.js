let ReactIns = [];

module.exports = {
    name: "react-in",
    execute: (msg, clargs, options) => {
        if (msg.channel.name = 'get-roles') {
            if (msg.member.hasPermission("ADMINISTRATOR")) {
                const { U, Perms } = options;

                if (ReactIns.length)
                    ReactIns.forEach((val, ind) => {
                        val.stop();

                        if (ind === ReactIns.length)
                            ReactIns.length = 0;
                    });

                U.ChatResponse(msg, `The following is a full-list of opt-able roles for this server.\n` +
                    `React to any role with ✅ to opt in, or 🚫 to opt out:`);

                const perms = Perms.getPerms(msg.guild.id);

                for (let p in perms) {
                    let additionalText = perms[p].length
                        ? ('Requires: ' + perms[p].join(', or ')) : '';

                    U.ChatResponse(msg, `${p}\t${additionalText}`).then(roleMessage => {
                        // const collector = 

                        ReactIns.push(
                            roleMessage.createReactionCollector(
                                (reaction, user) => ['🚫', '✅'].includes(reaction.emoji.name)
                            ).on('collect', (reaction, collector) => {
                                const role = msg.guild.roles.find('name', p);
                                const reactor = U.get_guild_member(reaction.users.last(), msg.guild);

                                if (!reactor || reactor.user.bot)
                                    return; //return console.log('reaction discarded!');

                                if (reaction.emoji.name === '✅') {
                                    U.bCanOptIn(reactor.roles, role.name, perms)
                                        ? reactor.addRole(role, 'User opt in')
                                        : reactor.createDM().then(dm => {
                                            dm.send(
                                                `\`\`\`Sorry, you aren't allowed to opt into role: `+ 
                                                `**${role.name}** on server: **${role.guild.name}**\`\`\``
                                            );
                                            collector.collected.forEach(val => val.remove(reactor));
                                        });
                                } else {
                                    reactor.removeRole(role, 'User opt out');
                                    collector.collected.forEach(val => val.remove(reactor));
                                }
                            })
                        );

                        roleMessage.react('✅').then(() => {
                            roleMessage.react('🚫').catch(console.error);
                        }).catch(console.error);
                    }).catch(console.error);
                }
            }
        }
    },
    description: "An admin-only command that allows users to opt into and out of roles via reactions to messages."
};