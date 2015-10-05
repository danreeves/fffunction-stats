import slack from '../lib/slack.js';

const channels = slack.getChannels();
let channelArray = [];
let messages = [];
let messageCount = {};
let userIDs = [];

const historyOf = function historyOf (channel) {
    return slack.historyOf(channel.id);
};
const countUserMessages = function countUserMessages (a, b) {
    if (a[b.user]) a[b.user]++;
    else a[b.user] = 1;
    return a;
};
const userMessageCount = function userMessageCount (response) {
    const data = JSON.parse(response.body);
    const user = {};
    if ('user' in data) {
        if (String(data.user.profile.email).includes('@fffunction.co')) {
            user.email = data.user.profile.email;
            user.messages = messageCount[data.user.id];
        }
    }
    return user;
};

export default function getSlackMessageCount () {
    return new Promise((resolve, reject) => {

        channels.then(function gotChannels (data) {
            channelArray = JSON.parse(data.body).channels;
            return Promise.all(channelArray.map(historyOf));
        })
        .then(function gotHistories (data) {
            messages = data.reduce((a, b) => a.concat(...b));
            messageCount = messages.reduce(countUserMessages, {});
            userIDs = Object.keys(messageCount);
            return Promise.all(userIDs.map(id => slack.userInfo(id)));
        })
        .then(function gotUsers (data) {
            messageCount = data.map(userMessageCount).filter((v) => Object.keys(v).length);
            resolve(messageCount);
        })
        .catch(reject);

    });

}
