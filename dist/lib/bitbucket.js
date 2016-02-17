'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

require('babel/polyfill');

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _cachedRequest = require('cached-request');

var _cachedRequest2 = _interopRequireDefault(_cachedRequest);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _ohauth = require('ohauth');

var _ohauth2 = _interopRequireDefault(_ohauth);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var req = (0, _cachedRequest2['default'])(_request2['default']);
req.setCacheDirectory(_path2['default'].join(process.env.APP_ROOT, 'cache'));
req.set('ttl', 4500000); // 1 hour 15 minutes in ms

var consumerKey = process.env.BITBUCKET_CONSUMER_KEY;
var consumerSecret = process.env.BITBUCKET_CONSUMER_SECRET;

var auth = _ohauth2['default'].headerGenerator({
    consumer_key: consumerKey,
    consumer_secret: consumerSecret
});

var bitbucketURL = {
    protocol: 'https',
    slashes: true,
    host: 'api.bitbucket.org'
};

function objToParam() {
    var obj = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var params = '';
    Object.keys(obj).forEach(function forEachKey(key) {
        if (params.length) params += '&';
        params += key + '=' + obj[key];
    });
    return params;
}

function prequest(requestURL, authHeader) {
    var opts = {
        url: requestURL,
        headers: {
            'Authorization': authHeader
        }
    };
    return new Promise(function requestPromise(resolve, reject) {
        req(opts, function requestCb(err, response, body) {
            if (err) reject(err);
            console.log(requestURL + ' returned ' + response.statusCode);
            resolve({ response: response, body: body });
        });
    });
}

function makeURL(pathname) {
    var query = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var newURL = _extends({}, bitbucketURL);
    newURL.pathname = pathname;
    newURL.search = objToParam(query);
    return _url2['default'].format(newURL);
}

exports['default'] = {

    getCommitsOf: function getCommitsOf(repo) {
        console.log('getting commits for ' + repo);
        var requestURL = makeURL('/2.0/repositories/fffunction/' + repo + '/commits/');
        var header = auth('GET', requestURL);
        return prequest(requestURL, header);
    },

    getRepos: function getRepos() {
        var page = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];

        var query = {
            page: page
        };
        var requestURL = makeURL('/2.0/repositories/fffunction', query);
        var header = auth('GET', requestURL, query);
        return prequest(requestURL, header);
    }

};
module.exports = exports['default'];