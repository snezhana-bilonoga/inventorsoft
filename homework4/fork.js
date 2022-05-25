const http = require('http');
const { fork } = require('child_process');

const host = 'localhost';
const port = 8000;

const requestListner = function (req, res) {
    console.log('Test');

    const child = fork(__dirname + '/fork_process');

    child.on('message', (message) => {
        console.log('Returning results');

        res.setHeader('Content-Type', 'application/json');
        res.writeHead(200);
        res.end(message);
    });
    child.send('START');

    console.log('Test2');
    console.log('Test3');
};

const server = http.createServer(requestListner);

server.listen(port, host, () => {
    console.log(`Server is running on http://${host}: ${port}`);
});
