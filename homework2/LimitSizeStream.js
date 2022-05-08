const stream = require('stream');
const LimitExceededError = require('./LimitExceededError');

class LimitSizeStream extends stream.Transform {
    constructor(options) {
        super(options);
        this.limit = options.limit;
    }

    _transform(chunk, encoding, callback) {
        if (chunk.length <= this.limit) {
            this.limit -= chunk.length;
            callback(null, chunk);
        } else {
            callback(new LimitExceededError());
        }
    }
}

module.exports = LimitSizeStream;
