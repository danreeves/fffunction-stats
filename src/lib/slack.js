import 'babel/polyfill';
import request from 'request';
import cachedRequest from 'cached-request';
import url from 'url';
import path from 'path';

const req = cachedRequest(request);
req.setCacheDirectory(path.join(process.env.APP_ROOT, 'cache'));
req.set('ttl', 60000); // 1 minute in ms

const token = process.env.SLACK_API_KEY;
const slackURL = {
    protocol: 'https',
    slashes: true,
    host: 'slack.com',
};

function objToParam (obj) {
    let params = '';
    Object.keys(obj).forEach(function forEachKey (key) {
        if (params.length) params += '&';
        params += `${key}=${obj[key]}`;
    });
    return params;
}

function prequest (getUrl) {
    return new Promise(function requestPromise (resolve, reject) {
        req(getUrl, function requestCb (err, response, body) {
            if (err) reject(err);
            resolve({ response, body });
        });
    });
}

function makeURL (method, query) {
    const newURL = { ...slackURL };
    newURL.pathname = `api/${method}`;
    newURL.search = objToParam(query);
    return url.format(newURL);
}

export default {

    getChannels () {
        const reqUrl = makeURL('channels.list', { token });
        return prequest(reqUrl);
    },

    historyOf (channel) {
        return new Promise((resolve, reject) => {
            const history = [];
            const getHistory = function getHistory (latest) {
                if (latest === undefined) latest = Date.now() / 1000;
                const reqUrl = makeURL('channels.history', { token, channel, latest });
                request(reqUrl, (err, res, body) => {
                    if (err) reject(err);
                    const data = JSON.parse(body);
                    history.push(...data.messages);
                    if (data.has_more) {
                        getHistory(data.messages[data.messages.length - 1].ts);
                    } else resolve(history);
                });
            };
            getHistory();
        });
    },

    userInfo (user) {
        const reqUrl = makeURL('users.info', { token, user });
        return prequest(reqUrl);
    },

    userStatus (user) {
        const reqUrl = makeURL('users.getPresence', { token, user });
        return prequest(reqUrl);
    },

    getUsers () {
        const reqUrl = makeURL('users.list', { token });
        return prequest(reqUrl);
    },

};
