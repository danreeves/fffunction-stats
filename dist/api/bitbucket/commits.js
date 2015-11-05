'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _libBitbucketJs = require('../../lib/bitbucket.js');

var _libBitbucketJs2 = _interopRequireDefault(_libBitbucketJs);

function getAllRepos() {
    var repos, getRepos;
    return regeneratorRuntime.async(function getAllRepos$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                getRepos = function getRepos() {
                    var page = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];
                    var repoResponse, body;
                    return regeneratorRuntime.async(function getRepos$(context$2$0) {
                        while (1) switch (context$2$0.prev = context$2$0.next) {
                            case 0:
                                context$2$0.next = 2;
                                return regeneratorRuntime.awrap(_libBitbucketJs2['default'].getRepos(page));

                            case 2:
                                repoResponse = context$2$0.sent;
                                body = JSON.parse(repoResponse.body);

                                repos = repos.concat(body.values.map(function (repo) {
                                    return repo.full_name.replace(/.*\//, '');
                                }));

                                if (!('next' in body)) {
                                    context$2$0.next = 8;
                                    break;
                                }

                                context$2$0.next = 8;
                                return regeneratorRuntime.awrap(getRepos(page + 1));

                            case 8:
                            case 'end':
                                return context$2$0.stop();
                        }
                    }, null, this);
                };

                repos = [];
                context$1$0.next = 4;
                return regeneratorRuntime.awrap(getRepos(1));

            case 4:
                return context$1$0.abrupt('return', repos);

            case 5:
            case 'end':
                return context$1$0.stop();
        }
    }, null, this);
}

exports['default'] = function getBitbucketCommitCount() {
    var repos, allCommitResponses, allCommits;
    return regeneratorRuntime.async(function getBitbucketCommitCount$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                context$1$0.next = 2;
                return regeneratorRuntime.awrap(getAllRepos());

            case 2:
                repos = context$1$0.sent;
                context$1$0.next = 5;
                return regeneratorRuntime.awrap(Promise.all(repos.map(function (repo) {
                    return _libBitbucketJs2['default'].getCommitsOf(repo);
                })));

            case 5:
                allCommitResponses = context$1$0.sent;
                allCommits = allCommitResponses.reduce(function (a, b) {
                    if (b.response.statusCode >= 200 && b.response.statusCode < 300) {
                        var vals = JSON.parse(b.body).values;
                        a = a.concat(vals);
                    }
                    return a;
                }, []);

                console.log(allCommits.length);

            case 8:
            case 'end':
                return context$1$0.stop();
        }
    }, null, this);
};

module.exports = exports['default'];