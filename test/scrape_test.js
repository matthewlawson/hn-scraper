const assert = require('assert');
const scraper = require('../scrape');
const expect = require('expect.js');
const Story = require('../models/Story');
const nock = require('nock');
const fs = require('fs');

var testDataPageOne = fs.readFileSync(__dirname+'/example_scrapes/page_1.html', 'utf8');
var testDataPageTwo = fs.readFileSync(__dirname+'/example_scrapes/page_2.html', 'utf8');
var newDesign = fs.readFileSync(__dirname+'/example_scrapes/new_format.html', 'utf8');

describe('Scrape test', function() {
    describe('#scrape()', function() {
        afterEach(function() {
            nock.cleanAll();
        });

        it("should return the correct amount of stories", function(done) {
            nock('https://news.ycombinator.com').get('/news?p=1').reply(200, testDataPageOne);
            let postCount = 5;
            scraper.scrape(postCount, function(results) {
                expect(results).to.have.length(postCount);
                done();
            });
        });

        it("should return valid property types", function(done) {
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

        it("should have correct story contents", function(done){
            nock('https://news.ycombinator.com').get('/news?p=1').reply(200, testDataPageOne);
            scraper.scrape(1, function(results) {
                var story = results.pop();
                expect(story.title).to.be('Introducing Netflix Stethoscopenetflix.com');
                expect(story.uri).to.be('http://techblog.netflix.com/2017/02/introducing-netflix-stethoscope.html');
                expect(story.author).to.be('dustinmoris');
                expect(story.points).to.be(267);
                expect(story.comments).to.be(63);
                expect(story.rank).to.be(1);
                done();
            });
        });

        it("should populate err in callback on HTTP 404", function(done){
            nock('https://news.ycombinator.com').get('/news?p=1').reply(404, "");
            scraper.scrape(1, function(results, err) {
                expect(results).to.be(null);
                expect(err).to.be("Bad HTTP Status returned: 404");
                done();
            });
        });

        it("should populate err in callback on HTTP 404", function(done){
            nock('https://news.ycombinator.com').get('/news?p=1').reply(500, "");
            scraper.scrape(1, function(results, err) {
                expect(results).to.be(null);
                expect(err).to.be("Bad HTTP Status returned: 500");
                done();
            });
        });

        it("should return no results and populate err during intermitent service", function(done) {
            //Good data in first page request
            nock('https://news.ycombinator.com').get('/news?p=1').reply(200, testDataPageOne);
            //500 in second.
            nock('https://news.ycombinator.com').get('/news?p=2').reply(500, "INTERNAL SERVER ERROR");
            //Fetching 100 results will make the scraper perform a second page request. Which will throw an error in this test.
            scraper.scrape(100, function(results, err) {
                expect(results).to.be(null);
                expect(err).to.be("Bad HTTP Status returned: 500");
                done();
            });
        });

        it("Should return an error if the page is not recognised by the parser", function(done) {
            //Good data in first page request
            for(var i = 1; i <= 11; i++) {
                //Scraper will start to perform a DOS HN on unrecognised formats, not ideal ..... 
                nock('https://news.ycombinator.com').get('/news?p='+i).reply(200, newDesign);
            }

            scraper.scrape(100, function(results, err) {
                expect(results).to.be(null);
                expect(err).to.be("Something has probably gone wrong.");
                done();
            });
        });
       
    });
});
