# Spot-Bot
A private Discord bot that controls and assigns roles to users

## Basic Usage
### admin-bot-control

This bot receives administrator commands from a channel called \#admin-bot-control in the server. This channel should be restricted to admin's only for security purposes.

### admin-bot-control Commands
```
c!addrole [role] [...list of roles required to opt-in...] [arg]
Command will add a role to get-roles. A following space-seperated list will define any roles that may opt into this role. A blank list will make the role available to anyone. Placing the optional argument '-t' anywhere in this command will auto-create a blank server role with the same name. Roles that include spaces may be denoted by wrapping them with quotation marks (").

c!removerole [...list of roles to be removed...]
Command will remove roles from get-roles, in order, until the end of a space-separated list. Roles that include spaces may be denoted by wrapping them with quotation marks (").

c!print [arg]
Command will print information about the bot. Valid args:
  perms - Prints role permissions in JSON.
  roles - Prints all roles visible to bot, server-wide.

c!clean-perms
Command will check that all role permissions have a corresponding role. If not, the permissions will be deleted.
```

### get-roles

Users interactive with this bot through a channel called \#get-roles in the server. This channel is open to anyone and should allow user's to quickly and easily self-manage their roles after the bot has been configured in \#admin-bot-control.

### get-roles Commands
```
c!opt-in [...list of roles...]
Command will attempt to opt into roles, in order, until the end of a space-separated list. Roles that include spaces may be denoted by wrapping them with quotation marks (").

c!opt-out [...list of roles...]
Command will attempt to opt out of roles, in order, until the end of a space-separated list. Roles that include spaces may be denoted by  wrapping them with quotation marks (").
```

## Current Status

Currently, this bot is private, though that may change in the future. However, the source code is free-to-use under the MIT license.
This bot in it's live state is running on Heroku and uses MongDB's Atlas AWS for a database.
