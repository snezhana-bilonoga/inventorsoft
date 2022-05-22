const fs = require('fs');
const path = require('path');

const express = require('express');
const { createGzip } = require('zlib');

const app = express();

const PORT = 5000;
const filePath = path.join(__dirname, 'text.txt');

app.post('/', (req, res) => {
    req.pipe(fs.createWriteStream(filePath));
    req.pipe(res);
});

app.get('/', (req, res) => {
    res.set('Content-Encoding', 'gzip');
    fs.createReadStream(filePath).pipe(createGzip()).pipe(res);
});

app.listen(PORT, () => {
    console.log(`Port ${PORT}`);
});
