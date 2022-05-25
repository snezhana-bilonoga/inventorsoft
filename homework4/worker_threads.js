const path = require('path');
const { Worker } = require('worker_threads');

for (let i = 0; i < 10; i++) {
    const worker = new Worker(path.join(__dirname, 'worker_process.js'));

    worker.on('message', (result) => {
        console.log(
            `Worker(${i}): Hash starts with ${result.str}: ${result.hash}`
        );
    });

    worker.on('error', (error) => {
        console.log(`Worker(${i}): Error ${error}`);
    });

    worker.on('exit', (exitCode) => {
        console.log(`Worker(${i}): Finished with code`, exitCode);
    });

    worker.postMessage({ str: '00' + i });
}
