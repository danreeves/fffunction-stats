import express from 'express';
import messageCount from './messageCount.js';

const app = express();

app.get('/', function getRoot (req, res) {
    messageCount().then(function (d) {
        res.json(d);
    }).catch(console.log.bind(console));
});

app.listen(80);
