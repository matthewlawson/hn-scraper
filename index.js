const cli = require('./cli');

try {
    options = cli.parseParameters();
    
}
catch (error){
    console.log(error.name);
    cli.printUsage();
}
