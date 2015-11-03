'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _libBitbucketJs = require('../../lib/bitbucket.js');

var _libBitbucketJs2 = _interopRequireDefault(_libBitbucketJs);

exports['default'] = function getBitbucketCommitCount() {
    var response, commits;
    return regeneratorRuntime.async(function getBitbucketCommitCount$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                context$1$0.next = 2;
                return regeneratorRuntime.awrap(_libBitbucketJs2['default'].getCommitsOf('beacontest'));

            case 2:
                response = context$1$0.sent;
                commits = JSON.parse(response.body);
                return context$1$0.abrupt('return', commits.values);

            case 5:
            case 'end':
                return context$1$0.stop();
        }
    }, null, this);
};

module.exports = exports['default'];