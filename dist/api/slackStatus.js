'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _libSlackJs = require('../lib/slack.js');

var _libSlackJs2 = _interopRequireDefault(_libSlackJs);

var getUserStatus = function getUserStatus(user) {
    return _libSlackJs2['default'].userStatus(user.id);
};

var emailToStatus = function emailToStatus(members) {
    return function (v, i) {
        if (String(members[i].profile.email).includes('@fffunction.co') && members[i].deleted !== true) {
            return {
                email: members[i].profile.email,
                status: JSON.parse(v.body).presence
            };
        }
    };
};

exports['default'] = function slackStatus() {
    var usersResponse, allMembers, memberStatus;
    return regeneratorRuntime.async(function slackStatus$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                context$1$0.next = 2;
                return regeneratorRuntime.awrap(_libSlackJs2['default'].getUsers());

            case 2:
                usersResponse = context$1$0.sent;
                allMembers = JSON.parse(usersResponse.body).members;
                context$1$0.next = 6;
                return regeneratorRuntime.awrap(Promise.all(allMembers.map(getUserStatus)));

            case 6:
                memberStatus = context$1$0.sent;
                context$1$0.next = 9;
                return regeneratorRuntime.awrap(memberStatus.map(emailToStatus(allMembers)).filter(function (v) {
                    return v !== undefined;
                }));

            case 9:
                return context$1$0.abrupt('return', context$1$0.sent);

            case 10:
            case 'end':
                return context$1$0.stop();
        }
    }, null, this);
};

module.exports = exports['default'];