const crypto = require('crypto');

function getHashStartsWith(startString) {
    let resultHash = '';

    do {
        const seed = Math.random().toString();
        const hash = crypto.createHash('sha256');
        hash.write(seed);
        resultHash = hash.digest('base64');
    } while (!resultHash.startsWith(startString));

    return resultHash;
}

module.exports = getHashStartsWith;
