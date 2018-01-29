const fs = require('fs');

//Ensures file meets minimum requirements to be a bot command
const bValidCommand = com => {
    if (com.hasOwnProperty("name"))
        if (com.hasOwnProperty("execute"))
            if (typeof com["name"] === 'string' && com["name"] != "")
                if (typeof com["execute"] === 'function') {
                    if (com.hasOwnProperty("description")) {
                        if (typeof com["description"] != 'string')
                            console.log(`Warning: Command: "${com['name']}" has an invalid description!`);
                    } else console.log(`Warning: Command: "${com['name']}" doesn't have a description!`);
                    return true;
                } else return console.log(`Failed: Command: "${com['name']}" has an invalid execute property!`);
            else return console.log(`Failed: Command has an invalid name property!`);
        else return console.log(`Failed: Command has no execute property!`);
    else return console.log(`Failed: Command has no name property!`);
}

/** @description Command object for accessing and executing commands
 * @returns {Object}
 */
module.exports = (() => {
    let searchDir = __dirname;

    if (fs.existsSync(searchDir)) {
        let commandList = {};
        for (let dir of fs.readdirSync(searchDir))
            if (fs.existsSync(searchDir + '/' + dir) && fs.lstatSync(searchDir + '/' + dir).isDirectory())
                for (let file of fs.readdirSync(searchDir + '/' + dir))
                    if (file.endsWith(".js")) {
                        let fileName = file.substring(0, file.length - 3);
                        let tempCom = require(searchDir + '/' + dir + '/' + fileName);

                        if (bValidCommand(tempCom) === true) {
                            commandList[tempCom.name] = tempCom;
                            console.log(`Command: ${tempCom.name} imported successfully!`);
                        } else console.log(`Failed to import command from: ${file}`);
                    }
        return commandList;
    } else return -1;
})();