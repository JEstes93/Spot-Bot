const Permission = require('../Models/Permission');

function PermissionManager() {

    //Guilds
    this.guilds = {};
    
    /**
     * @type {Permission[]}
     */
    this.models = [];
    
    /**
     * Creates new permissions from Mongoose model
     * @param {Permission} model Mongoose model for permissions
     */
    this.addGuild = function (model) {
        if (!this.guilds.hasOwnProperty(model.guildId)) {
            this.models.push(model);
            
            this.guilds[model.guildId] = {
                perms: JSON.parse(model.perms),
                modelIndex: this.models.length - 1,
            };
            
        } else {
            console.error("Cannot add guild! Guild already present!");
        }
    }

    /**
     * Removes permissions from storage
     * @param {String} id Guild ID string to remove
     */
    this.removeGuild = function (id) {
        if (this.guilds.hasOwnProperty(id)) {
            this.models.splice(this.guilds[id].modelIndex, 1);
            delete this.guilds[id];
        } else {
            console.error("Cannot remove guild! No guild to remove!");
        }
    }

    /**
     * Returns permissions object from storage
     * @param {String} id Guild ID to retrieve permissions for
     * @returns {Object}
     */
    this.getPerms = function (id) {
        if (this.guilds.hasOwnProperty(id)) {
            return this.guilds[id].perms;
        } else {
            console.error("Cannot getPerms!");
            // return false;
        }
    }

    /**
     * Saves new perms in memory
     * @param {String} id 
     * @param {Object} perms 
     */
    this.savePerms = function(id, perms){
        if (this.guilds.hasOwnProperty(id)) {
            this.guilds[id].perms = perms;

            //Updates and pushes to DB
            this.updatePermsInDB(id);
        } else {
            console.error("Cannot savePerms!");
        }
    }

    /**
     * Updates guild permissions in DB
     * @param {String} id Guild ID to update
     */
    this.updatePermsInDB = function(id){
        if (this.guilds.hasOwnProperty(id)) {
            let guild = this.guilds[id];
            this.models[guild.modelIndex].set({ perms: JSON.stringify(guild.perms) });
            this.models[guild.modelIndex].save();
            // Permission.update({ perms: JSON.stringify(guild.perms), });
        } else {
            console.error("Cannot updatePermsInDB!");
            return false;
        }
    }

    /**
     * Updates all models in DB
     */
    this.updateAllDB = function(){
        for(let m of this.models){
            this.updatePermsInDB(m.guildId);
        }
    }

    this.listModels = function(){
        for(let m of this.models){
            console.log(m);
        }
    }
}

module.exports = PermissionManager;