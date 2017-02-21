const  https = require('https');
const cheerio = require('cheerio')
const Story = require('./models/Story');

class Scrape {
    constructor() {
        this.pageNumber = 1;
        this.stories = [];
    }

    scrape(count, complete) {
        //Keep going until size of stories == count.
        this.fetchPage(this.pageNumber, function(body) {
            this.stories = this.stories.concat(this.parse(body));
            if(this.pageNumber > 10) {
                //Most requests should be complete within 4 pages, could be more due to validation
                //Very unlikely the first 10 pages would all fail validation criteria.
                throw new Error("Something has probably gone wrong.")
            }
            if(this.stories.length < count) {
                //keep going ... till we fill quota..
                this.pageNumber++;
                this.scrape(count, complete);
            }
            else {
                //We have enough stories, discard the ones we don't need ...
                complete(this.stories.slice(0, count));
            }
        }.bind(this));

    }
    parse(hnNewsBody) {
        //jquery style selectors for node ...
        let $ = cheerio.load(hnNewsBody);

        var stories = $('.athing').map(function(i, el) {
            try {
                return this.buildHNStory($(el), $(el).next());
            }
            catch(error) {
                return undefined;
            }
        }.bind(this)).get();
        
        return stories;
    }
    buildHNStory(storyRow, metaDataRow) {
        //element is a cheerio object representing one table row in HN
        let title, uri, author, points, comments, rank;
        let titleElement = storyRow.find('.title a');
        title = titleElement.text();
        uri = titleElement.attr('href');
        author = metaDataRow.find('.hnuser').text();
        points = metaDataRow.find('.score').text().replace(' points', ''); //Story imposes type checking
        let commentsMatch = metaDataRow.find('.subtext').text().match(/(\d+)\scomments/);
        comments = commentsMatch != null ? commentsMatch[1] : null; //Validated in Story obj
        rank = storyRow.find('.rank').text().replace('.', '');
        return new Story(title, uri, author, points, comments, rank);
    }
    fetchPage(pageNumber, callback) {
        //Returns HTML of specified Hacker News page.
        return https.get({
            host: 'news.ycombinator.com',
            path: '/news?p=' + pageNumber
        }, function (response) {
            // Continuously update stream with data
            var body = '';
            response.on('data', function (d) {
                body += d;
            });
            response.on('end', function () {
                callback( body );
            });
        });
    }
}

module.exports = new Scrape();