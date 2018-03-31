module.exports = {
    name: "clean",
    execute: (msg, clargs, options) => {
        if (msg.member.hasPermission("ADMINISTRATOR")) {
            if (clargs.length < 1) return;

            msg.reply("Are you sure?").then(reply => {
                reply.react('✅');

                reply.createReactionCollector((reaction, user) =>
                    (reaction.emoji.name === '✅' && !user.bot && user.id === msg.author.id),
                    { time: 5000, }
                ).on('collect', (reaction, collection) => collection.stop('success')
                ).on('end', (collected, reason) =>
                    ((reason === 'success')
                        ? msg.channel.fetchMessages({
                            limit: parseInt(clargs[0], 10),
                            before: msg.id,
                        }).then(data => msg.channel.bulkDelete(data))
                        : reply.edit("Action cancelled due to timeout!")
                    ).then(() => {
                        msg.delete();
                        reply.delete();
                    })
                );
            });
        }
    },
    description: "Allows admins to bulk-delete messages in channels"
};