"use strict";
const commandLineArgs = require('command-line-args')
// Add usage guide. 
class Cli {
    parseParameters() {
        const optionDefinitions = [
            { name: 'posts', alias: 'p', type: Number, defaultValue: 10, description: "The amount of posts to fetch from hacker news" }
        ]

        const options = commandLineArgs(optionDefinitions);
        //Validate posts option < 100 not NaN & post usage if required.
        if(isNaN(options.posts) || options.posts > 100) {
            throw {name: "INVALID_POST_OPTION"};
        }
        return options;
    }

    printUsage() {
        console.log("How to use this tool....");
    }
    
}

module.exports = new Cli();