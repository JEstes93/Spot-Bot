const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');

const P = require('./src/cli-parser');
const U = require('./src/utils');

//Command object that executes command logic
const Command = require('./src/commands/init');

client.on('ready', () => {
    client.user.setUsername("SpottaDot The Copi Bot");

    console.log('Logged in as ' + client.user.tag + '!');

    U.ensure_directory('./storage', a => {
        U.ensure_directory(a + '/guilds', b => {
            client.guilds.forEach(g => {
                U.ensure_directory(b + g.name, c => {
                    if (!fs.exists(c + '/perms.json'))
                        fs.writeFile(c + '/perms.json', JSON.stringify({}));

                    if (!fs.exists(c + '/suggestions.json'))
                        fs.writeFile(c + '/suggestions.json', JSON.stringify({}));
                });
            });
        });
    });
});

client.on('message', msg => {
    if (msg.system)
        return;
    else if (msg.channel.name != 'get-roles' && msg.channel.name != 'admin-bot-control' && msg.channel.name != 'bot-suggestions')
        return;
    else if (U.bHasCommandSignature(msg) != true)
        return;
    else {
    //Parse for strings in quotation marks here
    let clargs = P.parse(msg.content);

    let commandGiven = clargs.splice(0, 1)[0];

    if(Command.hasOwnProperty(commandGiven)){
        Command[commandGiven].execute(msg, clargs);
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

client.login(JSON.parse(fs.readFileSync('./secure.json')).token);