const Discord = require('discord.js');
const client = new Discord.Client();

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO).then(res => {
    const P = require('./src/cli-parser');
    const U = require('./src/utils');

    //Command object that executes command logic
    const Command = require('./src/commands/init');

    const Spotify = require('node-spotify-api');
    const spotify = new Spotify({
        id: process.env.SpotifyID,
        secret: process.env.SpotifySecret
    });

    const User = require('./src/db/Models/User');
    const Permission = require('./src/db/Models/Permission');
    const PM = require('./src/db/utils/permsManager');
    const Perms = new PM();

    client.on('ready', () => {
        client.user.setUsername("SpottaDot The Copi Bot");

        console.log('Logged in as ' + client.user.tag + '!');

        client.guilds.forEach(guild => {
            Permission.findOne({ 'guildId': guild.id }, 'guildId guild perms').then(res => {
                if (res && res != null)
                    Perms.addGuild(res);
                else {
                    Permission
                        .create({
                            guildId: guild.id,
                            guild: JSON.stringify(guild),
                            perms: JSON.stringify({})
                        })
                        .then(res => {
                            Perms.addGuild(res);
                        });
                }
            }, err => console.error(err));
        });
    });

    // client.on('guildMemberAvailable presenceUpdate ')

    // client.on('guildMemberUpdate', (old, newM) => {
    //     console.log('guildMemberUpdate');
    //     console.log(old.user.username);
    //     console.log(old.user.presence);
    //     console.log(newM.user.username);
    //     console.log(newM.user.presence);
    // });

    // client.on('guildMemberAvailable', member => {
    //     console.log('guildMemberAvailable');
    //     console.log(member.user.username);
    // });

    // client.on('presenceUpdate', (old, newM) => {
    //     console.log('presenceUpdate');
    //     console.log(old.user.username);
    //     console.log(old.user.presence);
    //     console.log(newM.user.username);
    //     console.log(newM.user.presence);
    // });

    client.on('message', msg => {
        if (msg.system)
            return;
        else if (msg.author.bot)
            return;
        else if (msg.channel.name != 'get-roles' && msg.channel.name != 'admin-bot-control' && msg.channel.name != 'bot-suggestions')
            return;
        else if (U.bHasCommandSignature(msg) != true)
            return;
        else {
            //Parse for strings in quotation marks here
            let clargs = P.parse(msg.content);

            let commandGiven = clargs.splice(0, 1)[0];

            if (Command.hasOwnProperty(commandGiven))
                Command[commandGiven].execute(msg, clargs, { client, Perms, spotify, U, db: { User } });
            else
                console.log("No command found in Command object!");

            //Necessary? Could be improved?
            if (clargs[clargs.length - 1] === '-h')
                msg.delete();
        }
    });

    client.on('guildCreate', guild => {
        console.log(`Invited to: ${guild.name}!`);
        Permission.findOne({ 'guildId': guild.id }, 'guildId guild perms').then(res => {
            if (res && res != null)
                Perms.addGuild(res);
            else {
                Permission.create({
                    guildId: guild.id,
                    guild: JSON.stringify(guild),
                    perms: JSON.stringify({})
                }).then(res => {
                    Perms.addGuild(res);
                });
            }
        }, err => console.error(err));

    });

    client.on('guildDelete', guild => {
        console.log(`Banished from: ${guild.name}!`);
        Permission.deleteOne({ 'guildId': guild.id }).then(res => {
            Perms.removeGuild(guild.id);
        });
    });

    client.login(process.env.DISCORD_TOKEN);

}, err => {
    for (let e of err.errors) {
        console.log("Error Name:");
        console.log(e.name);
        console.log("Error Err:");
        console.log(e.err);
    }
});