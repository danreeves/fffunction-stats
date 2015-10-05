import express from 'express';
import messageCount from './api/messageCount.js';
import slackStatus from './api/slackStatus.js';

const app = express();

app.get('/api/slack_messages', async (req, res) => {
    const data = await messageCount();
    res.json(data);
});

app.get('/api/slack_status', async (req, res) => {
    const data = await slackStatus();
    res.json(data);
});

app.listen(80);
