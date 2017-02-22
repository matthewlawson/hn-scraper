# Hacker News Scraper

## Installing
Install the latest version of node and npm from [node](https://nodejs.org/en/)

It has been tested with node v6.10.0 and npm 3.10.10

### Install Dependencies

    $ npm Install

## Running Tests

    $ npm test

## Final Setup
    $ `alias hackernews='node index.js'

## Run the app
    $  hackernews --posts 12

## 3rd Party libraries
A number of 3rd party node libraries were used 

### App libraries

#### [command-line-args](https://www.npmjs.com/package/command-line-args) 
Used to validate and parse command line arguments 

#### [cheerio](https://www.npmjs.com/package/cheerio) 
jQuery style DOM parsing. Used to extract properties from downloaded HN page.

### Testing

#### [mocha](https://www.npmjs.com/package/mocha) 
Testing framework

#### [expect.js](https://www.npmjs.com/package/expect.js) 
BDD assertions for mocha. To have nice verbose assertions over nodes assert library.


## To Do
* Write test for the scraper
* Better comments