import slack from '../../lib/slack.js';

const countUserMessages = function countUserMessages (a, b) {
    if (a[b.user]) a[b.user]++;
    else a[b.user] = 1;
    return a;
};

const userMessageCount = function userMessageCount (messageCount) {
    return (response) => {
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
};

export default async function getSlackMessageCount () {
    const channelsResponse = await slack.getChannels();
    const channelArray = JSON.parse(channelsResponse.body).channels;
    const allHistories = await Promise.all(channelArray.map((channel) => slack.historyOf(channel.id)));
    const allMessages = allHistories.reduce((a, b) => a.concat(...b));
    const messageCount = allMessages.reduce(countUserMessages, {});
    const userIDs = Object.keys(messageCount);
    const allUsers = await Promise.all(userIDs.map(id => slack.userInfo(id)));
    return await allUsers.map(userMessageCount(messageCount)).filter((v) => Object.keys(v).length);
}
