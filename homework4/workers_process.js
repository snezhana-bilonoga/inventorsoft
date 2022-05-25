const { parentPort } = require('worker_threads');

const getHashStartsWith = require('./hash');

parentPort.on('message', ({ nums }) => {
    nums.map((num) => num.toString()).forEach((str) => {
        parentPort.postMessage({ str, hash: getHashStartsWith(str) });
    });
    parentPort.close();
});
