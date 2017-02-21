class Story {
    //Class representing :
    //  {
    //     "title": "Instapaper is joining Pinterest",
    //     "uri": "http://blog.instapaper.com/post/149374303661",
    //     "author": "ropiku",
    //     "points": 182,
    //     "comments": 99,
    //     "rank": 2
    // }
    constructor(title, uri, author, points, comments, rank) {
        //title and author are non empty strings not longer than 256 characters.
        // uri is a valid URI
        // points, comments and rank are integers >= 0.
        this.title = title;
        this.uri = uri;
        this.author = author;
        this.points = parseInt(points);
        this.comments = parseInt(comments);
        this.rank = parseInt(rank);
        this.validate();

    }
    validate() {
        if (this.title.length >= 256) {
            throw new Error("Title Too long");
        }
        if (isNaN(this.points) || this.points == 0 || isNaN(this.comments) || this.comments == 0
            || isNaN(this.rank) || this.rank == 0) {
            throw new Error("Points or comments or rank not valid ...");
        }
        if(!this.validateUrl(this.uri)) {
            throw new Error("URL is invalid");
        }
    }

    //http://stackoverflow.com/questions/8667070/javascript-regular-expression-to-validate-url
    validateUrl(value) {
        return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);
    }
}

module.exports = Story;