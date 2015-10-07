import express from 'express';
import Cacher from 'cacher';
import addPathsTo from './lib/addPaths.js';
import slackMessages from './api/slack/messages.js';
import slackStatus from './api/slack/status.js';
const env = process.env.NODE_ENV || 'development';

const app = express();
const cacher = new Cacher();
const addPaths = addPathsTo(app);

const paths = {
    api: {
        slack: {
            messages: slackMessages,
            status: slackStatus,
        },
    },
};

if (env === 'production') {
    app.use(cacher.cache('days', 1));
}
addPaths(paths, '/');

app.listen(80);
