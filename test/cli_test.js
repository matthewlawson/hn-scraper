const assert = require('assert');
const cli = require('../cli');
const expect = require('expect.js');

describe('CLI Option test', function() {
    describe('#parseParameters()', function() {
        it('post should defailt to 10 if no options provided', function() {
          let options = cli.parseParameters();
          expect(options.posts).to.be(10)
        });

        it('should throw exception with invalid option', function(){
            process.argv.push('--posts');
            process.argv.push('a');
            expect(cli.parseParameters).to.throwError();
            process.argv.pop();process.argv.pop();
        });

        it('should throw exception post count too high', function(){
            process.argv.push('--posts');
            process.argv.push('123');
            expect(cli.parseParameters).to.throwError();
            process.argv.pop();process.argv.pop();
        });

        it('should return correctly formatted count', function(){
            let postCount = 20;
            process.argv.push('--posts');
            process.argv.push(postCount);
            options = cli.parseParameters();
            expect(options.posts).to.be(postCount)
            process.argv.pop();process.argv.pop();
        });
    });
});
