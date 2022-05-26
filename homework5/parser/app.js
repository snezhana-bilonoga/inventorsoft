const fs = require('fs');
const path = require('path');
const { createGzip } = require('zlib');

const axios = require('axios');
const cheerio = require('cheerio');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

const careersUrl = 'https://inventorsoft.co/careers';
const filePath = path.join(__dirname, 'vacancies.txt');

const getHTML = async (url) => {
    const { data } = await axios.get(url);
    return cheerio.load(data);
};

const parseAndSave = async (url, path) => {
    const writeStream = fs.createWriteStream(path);
    const html = await getHTML(url);
    html('.vacancy-card').each((i, el) => {
        const title = html(el).find('.vacancy__title').text();
        const siniority = html(el).find('.vacancy__seniority').text();
        writeStream.write(`${title} ${siniority}\n`);
    });
};

const zipAndSend = async (url, path) => {
    await parseAndSave(url, path);

    const transporter = nodemailer.createTransport(
        smtpTransport({
            service: 'mail',
            host: 'smtp.mail.com',
            auth: {
                user: 'sender.email@mail.com',
                pass: 'sender.password',
            },
        })
    );

    const mailOptions = {
        from: 'sender.email@mail.com',
        to: 'receiver.email@mail.com',
        subject: 'Vacancies',
        text: 'Hello, Vacancies are attached!',
        attachments: {
            filename: 'vacancies.txt.gz',
            content: fs.createReadStream(path).pipe(createGzip()),
        },
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Email send: ' + info.response);
        }
    });
};

zipAndSend(careersUrl, filePath);
