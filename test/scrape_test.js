const assert = require('assert');
const scraper = require('../scrape');
const expect = require('expect.js');
const Story = require('../models/Story');
const nock = require('nock');
const fs = require('fs');

var testDataPageOne = fs.readFileSync(__dirname+'/example_scrapes/page_1.html', 'utf8');


describe('Scrape test', function() {
    describe('#scrape()', function() {
        it("should return the correct amount of stories", function(done) {
            nock('https://news.ycombinator.com').get('/news?p=1').reply(200, testDataPageOne);
            let postCount = 5;
            scraper.scrape(postCount, function(results) {
                expect(results).to.have.length(postCount);
                done();
            });
        });

        it("verify story property types", function(done) {
            nock('https://news.ycombinator.com').get('/news?p=1').reply(200, testDataPageOne);
            scraper.scrape(1, function(results) {
                var story = results.pop();
                expect(story).to.be.a(Story);
                expect(story.title).to.be.a('string');
                expect(story.uri).to.be.a('string');
                expect(story.author).to.be.a('string');
                expect(story.points).to.be.a('number');
                expect(story.comments).to.be.a('number');
                expect(story.rank).to.be.a('number');
                done();
            });
        });

        it("verify story contents", function(done){
            nock('https://news.ycombinator.com').get('/news?p=1').reply(200, testDataPageOne);
            scraper.scrape(1, function(results) {
                var story = results.pop();

                done();
            });
        });

        it("verify 4xx code", function(done){
            nock('https://news.ycombinator.com').get('/news?p=1').reply(404, "");
            scraper.scrape(1, function(results) {
                var story = results.pop();
                // console.log(story);
                done();
            });
        });

        it("verify 500 error", function(done){
            nock('https://news.ycombinator.com').get('/news?p=1').reply(500, testDataPageOne);
            scraper.scrape(1, function(results) {
                var story = results.pop();

                done();
            });
        });
        
    });
});
