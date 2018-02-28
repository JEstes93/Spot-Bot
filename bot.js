const Discord = require('discord.js');
const client = new Discord.Client();

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO).then(res => {
    Continue();
}, err => {
    for (let e of err.errors) {
        console.log("Error Name:");
        console.log(e.name);
        console.log("Error Err:");
        console.log(e.err);
    }
});

const P = require('./src/cli-parser');
const U = require('./src/utils');

//Command object that executes command logic
const Command = require('./src/commands/init');


function Continue() {

    const Permission = require('./Permission');
    const PM = require('./permsManager');
    const Perms = new PM();

    client.on('ready', () => {
        client.user.setUsername("SpottaDot The Copi Bot");

        console.log('Logged in as ' + client.user.tag + '!');

        client.guilds.forEach(guild => {
            // console.log("I'm part of: " + guild.id);

            Permission.findOne({ 'guildId': guild.id }, 'guildId guild perms').then(res => {
                // console.log(res);
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
                            // console.log("Creation Response!: " + res);
                            Perms.addGuild(res);
                        });
                }
            }, err => console.error(err));

        });

    });

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

            if (Command.hasOwnProperty(commandGiven)) {
                Command[commandGiven].execute(msg, clargs, Perms);
            } else {
                console.log("No command found in Command object!");

                switch (commandGiven) {
                    default:
                        console.log("No valid commands found!");
                        break;
                }
            }

            //Necessary? Could be improved?
            if (clargs[clargs.length - 1] === '-h')
                msg.delete();
        }
    });

    client.on('guildCreate', guild => {

        Permission.findOne({ 'guildId': guild.id }, 'guildId guild perms').then(res => {
            // console.log(res);
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
                        // console.log("Creation Response!: " + res);
                        Perms.addGuild(res);
                    });
            }
        }, err => console.error(err));

    })

    client.login(process.env.DISCORD_TOKEN);
}