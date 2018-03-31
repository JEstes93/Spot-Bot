module.exports = {
    name: "clean",
    execute: (msg, clargs, options) => {
        if (msg.member.hasPermission("ADMINISTRATOR")) {
            if (clargs.length < 1) return;

            const num = Math.min(parseInt(clargs[0], 10), 100);
            const addin = (num === 100) ? ` (Note: Limit is 100, greater values will be reduced to match.)` : '';

            msg.reply(`**Are you sure?**${addin}`)
                .then(reply => reply.react('✅')
                    .then(reaction => reaction.message)
                    .then(reply => reply.createReactionCollector((reaction, user) =>
                        (reaction.emoji.name === '✅' && !user.bot && user.id === msg.author.id),
                        { time: 5000, }
                    ).on('collect', (reaction, collection) => collection.stop('success')
                    ).on('end', (collected, reason) =>
                        ((reason === 'success')
                            ? msg.channel.fetchMessages({
                                limit: num,
                                before: msg.id,
                            }).then(data => msg.channel.bulkDelete(data)
                                .then(res => res, reason => data.deleteAll()))
                            : reply.edit("Action cancelled due to timeout!")
                        ).then(() => {
                            msg.delete();
                            reply.delete();
                        }).catch(console.error)
                    )));
        }
    },
    description: "Allows admins to bulk-delete messages in channels"
};