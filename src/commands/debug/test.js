const U = require('../../utils');

module.exports = {
        name: "test",
        execute: (msg, clargs) => {
                U.safetyfire(msg.author.id) ? console.log("Hello master!") : console.log("Imposter detected!");
        },
        description: "General purpose testing command"
};