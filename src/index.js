import express from 'express';
import messageCount from './api/messageCount.js';
import slackStatus from './api/slackStatus.js';

const app = express();

app.get('/api/slack_messages', (req, res) => {
    messageCount().then((d) => {
        res.json(d);
    });
});

app.get('/api/slack_status', (req, res) => {
    slackStatus().then((d) => {
        res.json(d);
    });
});

app.listen(80);
