import 'babel/polyfill';
import request from 'request';
import url from 'url';
import oh from 'ohauth';

const consumerKey = process.env.BITBUCKET_CONSUMER_KEY;
const consumerSecret = process.env.BITBUCKET_CONSUMER_SECRET;
const auth = oh.headerGenerator({
    consumer_key: consumerKey,
    consumer_secret: consumerSecret,
});
const bitbucketURL = {
    protocol: 'https',
    slashes: true,
    host: 'bitbucket.org',
};

function objToParam (obj = {}) {
    let params = '';
    Object.keys(obj).forEach(function forEachKey (key) {
        if (params.length) params += '&';
        params += `${key}=${obj[key]}`;
    });
    return params;
}

function prequest (opts = {}) {
    return new Promise(function requestPromise (resolve, reject) {
        request(opts, function requestCb (err, response, body) {
            if (err) reject(err);
            resolve({ response, body });
        });
    });
}

function makeURL (path, query = {}) {
    const newURL = { ...bitbucketURL };
    newURL.pathname = path;
    newURL.search = objToParam(query);
    return url.format(newURL);
}

export default {

    getCommitsOf (repo) {
        const requestURL = makeURL(`/api/2.0/repositories/fffunction/${repo}/commits/HEAD`);
        const header = auth('GET', requestURL);
        return prequest({
            url: requestURL,
            headers: {
                'Authorization': header,
            },
        });

    },

};
