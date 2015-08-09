import express from 'express';
import messageCount from './messageCount.js';
import slackStatus from './slackStatus.js';

const app = express();

app.get('/api/slack_messages', function slack_messages (req, res) {
    messageCount().then(function (d) {
        res.json(d);
    });
});

app.get('/api/slack_status', function slack_status (req, res) {
    slackStatus().then(function (d) {
        res.json(d);
    }).catch(console.log);
});


app.listen(80);
