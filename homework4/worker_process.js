const { parentPort } = require('worker_threads');

const getHashStartsWith = require('./hash');

parentPort.on('message', ({ str }) => {
    parentPort.postMessage({ str, hash: getHashStartsWith(str) });
    parentPort.close();
});
