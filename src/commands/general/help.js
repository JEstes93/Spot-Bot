const U = require('../../utils');

module.exports = {
        name: "help",
        execute: (msg, clargs) => {
                switch (msg.channel.name) {
                        case 'get-roles':
                                U.ChatResponse(msg, "Help\tCommands\n" +
                                        "c!opt-in [...list of roles...]\nCommand will attempt to opt into roles, in order, until the end of a space-separated list. Roles that include spaces may be denoted by wrapping them with quotation marks (\"\").\n\n" +
                                        "c!opt-out [...list of roles...]\nCommand will attempt to opt out of roles, in order, until the end of a space-separated list. Roles that include spaces may be denoted by wrapping them with quotation marks (\"\").\n\n" +
                                        "c!avail\nCommand will list roles available for opting in, and any roles they may require to do so.\n\n"
                                );
                                break;
                        case 'admin-bot-control':
                                U.ChatResponse(msg, "Admin\tCommands\n" +
                                        "c!addrole [role] [...list of roles required to opt-in...] [arg]\nCommand will add a role to get-roles. A following space-seperated list will define any roles that may opt into this role. A blank list will make the role available to anyone. Placing the optional argument '-t' anywhere in this command will auto-create a blank server role with the same name. Roles that include spaces may be denoted by wrapping them with quotation marks (\"\").\n\n" +
                                        "c!removerole [...list of roles to be removed...]\nCommand will remove roles from get-roles, in order, until the end of a space-separated list. Roles that include spaces may be denoted by wrapping them with quotation marks (\"\").\n\n" +
                                        "c!print [arg]\nCommand will print information about the bot. Valid args:\n" +
                                        "perms\t  Prints role permissions in JSON.\nroles\t  Prints all roles visible to bot, server-wide.\n\n" +
                                        "c!clean-perms\nCommand will check that all role permissions have a corresponding role. If not, the permissions will be deleted.\n\n" +
                                        "c!avail\nCommand will list roles available for opting in, and any roles they may require to do so.\n\n"
                                );
                                break;
                        case 'bot-suggestions':
                                U.ChatResponse(msg, "Suggest\tFeatures\n" +
                                        "c!suggest [full suggestion text]\nCommand will record suggestions for the improvement of the bot. Any text after the command will be included as the suggestion text. Be descriptive!\n\n"
                                );
                                break;
                }
        },
        description: "Help command that supplies information about commands available to the requesting message's channel"
};