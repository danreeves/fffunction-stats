'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = slackStatus;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _libSlackJs = require('../lib/slack.js');

var _libSlackJs2 = _interopRequireDefault(_libSlackJs);

var userStatus = function userStatus(user) {
    return _libSlackJs2['default'].userStatus(user.id);
};
var mapStatus = function mapStatus(members) {
    return function (v, i) {
        if (String(members[i].profile.email).includes('@fffunction.co') && members[i].deleted !== true) {
            return {
                email: members[i].profile.email,
                status: JSON.parse(v.body).presence
            };
        }
    };
};

function slackStatus() {
    var _this = this;

    return new Promise(function callee$1$0(resolve) {
        var usersResponse, members, memberStatus, mappedUsers;
        return regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
                case 0:
                    context$2$0.next = 2;
                    return regeneratorRuntime.awrap(_libSlackJs2['default'].getUsers());

                case 2:
                    usersResponse = context$2$0.sent;
                    members = JSON.parse(usersResponse.body).members;
                    context$2$0.next = 6;
                    return regeneratorRuntime.awrap(Promise.all(members.map(userStatus)));

                case 6:
                    memberStatus = context$2$0.sent;
                    context$2$0.next = 9;
                    return regeneratorRuntime.awrap(memberStatus.map(mapStatus(members)).filter(function (v) {
                        return v !== undefined;
                    }));

                case 9:
                    mappedUsers = context$2$0.sent;

                    resolve(mappedUsers);

                case 11:
                case 'end':
                    return context$2$0.stop();
            }
        }, null, _this);
    });
}

module.exports = exports['default'];