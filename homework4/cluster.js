const cluster = require('cluster');
const http = require('http');
const os = require('os');

const getHashStartsWith = require('./hash');

if (cluster.isMaster) {
    const cpusCount = os.cpus().length;

    console.log(`Master ${process.pid} is running`);

    for (let i = 0; i < cpusCount - 1; i++) {
        cluster.fork();
    }
    cluster.on('exit', (worker, code, signal) => {
        console.log(
            `worker ${worker.process.pid} died with code ${code} and signal ${signal}`
        );
        cluster.fork();
    });
} else {
    http.createServer((req, res) => {
        console.log(`Worker ${process.pid}: WORKED`);

        const hash = getHashStartsWith(process.pid.toString().slice(0, 3));

        res.writeHead(200);
        res.end(`Hash: ${hash}`);
    }).listen(8000);

    console.log(`Worker ${process.pid} started`);
}
