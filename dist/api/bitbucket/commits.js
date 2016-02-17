'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _libBitbucketJs = require('../../lib/bitbucket.js');

var _libBitbucketJs2 = _interopRequireDefault(_libBitbucketJs);

var fffunctioneers = ['petercolesdc', 'bencoleman', 'urlsangel', 'bouncingdan', 'bendarby', 'danreeves', 'michellegale'];

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
                                console.log(page);
                                context$2$0.next = 3;
                                return regeneratorRuntime.awrap(_libBitbucketJs2['default'].getRepos(page));

                            case 3:
                                repoResponse = context$2$0.sent;
                                body = JSON.parse(repoResponse.body);

                                repos = repos.concat(body.values.map(function (repo) {
                                    return repo.full_name.replace(/.*\//, '');
                                }));

                                if (!('next' in body)) {
                                    context$2$0.next = 9;
                                    break;
                                }

                                context$2$0.next = 9;
                                return regeneratorRuntime.awrap(getRepos(page + 1));

                            case 9:
                            case 'end':
                                return context$2$0.stop();
                        }
                    }, null, this);
                };

                repos = [];
                context$1$0.next = 4;
                return regeneratorRuntime.awrap(getRepos(1));

            case 4:
                console.log(repos);
                return context$1$0.abrupt('return', repos);

            case 6:
            case 'end':
                return context$1$0.stop();
        }
    }, null, this);
}

function countUserCommits(a, b) {
    try {
        if (b.author.user.username in a) a[b.author.user.username]++;else a[b.author.user.username] = 1;
    } catch (e) {
        // key error if bitbucket user doesn't exist
    }
    return a;
}

exports['default'] = function getBitbucketCommitCount() {
    var repos, allCommitResponses, allCommits, commitCount;
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
                commitCount = allCommits.reduce(countUserCommits, {});
                return context$1$0.abrupt('return', Object.keys(commitCount).filter(function (user) {
                    return fffunctioneers.includes(user);
                }).map(function (user) {
                    return {
                        username: user,
                        commits: commitCount[user]
                    };
                }));

            case 9:
            case 'end':
                return context$1$0.stop();
        }
    }, null, this);
};

module.exports = exports['default'];