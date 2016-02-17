import 'babel/polyfill';
import request from 'request';
import cachedRequest from 'cached-request';
import url from 'url';
import oh from 'ohauth';
import path from 'path';

const req = cachedRequest(request);
req.setCacheDirectory(path.join(process.env.APP_ROOT, 'cache'));
req.set('ttl', 4500000); // 1 hour 15 minutes in ms

const consumerKey = process.env.BITBUCKET_CONSUMER_KEY;
const consumerSecret = process.env.BITBUCKET_CONSUMER_SECRET;

const auth = oh.headerGenerator({
    consumer_key: consumerKey,
    consumer_secret: consumerSecret,
});

const bitbucketURL = {
    protocol: 'https',
    slashes: true,
    host: 'api.bitbucket.org',
};

function objToParam (obj = {}) {
    let params = '';
    Object.keys(obj).forEach(function forEachKey (key) {
        if (params.length) params += '&';
        params += `${key}=${obj[key]}`;
    });
    return params;
}

function prequest (requestURL, authHeader) {
    const opts = {
        url: requestURL,
        headers: {
            'Authorization': authHeader,
        },
    };
    return new Promise(function requestPromise (resolve, reject) {
        req(opts, function requestCb (err, response, body) {
            if (err) reject(err);
            console.log(`${requestURL} returned ${response.statusCode}`);
            resolve({ response, body });
        });
    });
}

function makeURL (pathname, query = {}) {
    const newURL = { ...bitbucketURL };
    newURL.pathname = pathname;
    newURL.search = objToParam(query);
    return url.format(newURL);
}

export default {

    getCommitsOf (repo) {
        console.log(`getting commits for ${repo}`)
        const requestURL = makeURL(`/2.0/repositories/fffunction/${repo}/commits/`);
        const header = auth('GET', requestURL);
        return prequest(requestURL, header);
    },

    getRepos (page = 1) {
        const query = {
            page,
        };
        const requestURL = makeURL(`/2.0/repositories/fffunction`, query);
        const header = auth('GET', requestURL, query);
        return prequest(requestURL, header);
    },

};
