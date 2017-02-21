const cli = require('./cli');
const scrape = require('./scrape');

try {
    options = cli.parseParameters();
    //Options are all valid and good....
    scrape.scrape(options.posts, function(parsedStories) {
        console.log(JSON.stringify(parsedStories, null, 4));
    });
}
catch (error){
    console.log(error);
    cli.printUsage();
}
