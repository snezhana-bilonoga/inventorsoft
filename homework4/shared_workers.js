const path = require('path');
const { Worker } = require('worker_threads');

const nums = [212, 335, 150, 404];

const size = Int32Array.BYTES_PER_ELEMENT * nums.length;
console.log(`buffer size: ${size} \n`);

const sharedBuffer = new SharedArrayBuffer(size);
const sharedArray = new Int32Array(sharedBuffer);

console.log(`Shared array size, before data: ${sharedArray} \n`);

nums.forEach((num, index) => {
    console.log(num);
    Atomics.store(sharedArray, index, num);
});

console.log(`Shared array: ${sharedArray} \n`);

const worker = new Worker(path.join(__dirname, './workers_process.js'));

worker.on('message', (result) => {
    console.log(`Hash starts with ${result.str}: ${result.hash}`);
});

worker.on('error', (error) => {
    console.log(`Error ${error}`);
});

worker.on('exit', (exitCode) => {
    console.log(`Finished with code`, exitCode);
});

worker.postMessage({ nums: sharedArray });
