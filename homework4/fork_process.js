const getHashStartsWith = require('./hash');

process.on('message', (message) => {
    if (message === 'START') {
        console.log('Child process received START message');

        const result = getHashStartsWith('000');

        const message = `{"Hash": ${result}}`;
        process.send(message);
    }
});
