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

    return new Promise(function callee$1$0(resolve, reject) {
        var usersResponse, members, memberStatus, mappedUsers;
        return regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
                case 0:
                    context$2$0.prev = 0;
                    context$2$0.next = 3;
                    return regeneratorRuntime.awrap(_libSlackJs2['default'].getUsers());

                case 3:
                    usersResponse = context$2$0.sent;
                    members = JSON.parse(usersResponse.body).members;
                    context$2$0.next = 7;
                    return regeneratorRuntime.awrap(Promise.all(members.map(userStatus)));

                case 7:
                    memberStatus = context$2$0.sent;
                    context$2$0.next = 10;
                    return regeneratorRuntime.awrap(memberStatus.map(mapStatus(members)).filter(function (v) {
                        return v !== undefined;
                    }));

                case 10:
                    mappedUsers = context$2$0.sent;

                    resolve(mappedUsers);
                    context$2$0.next = 17;
                    break;

                case 14:
                    context$2$0.prev = 14;
                    context$2$0.t0 = context$2$0['catch'](0);

                    reject(context$2$0.t0);

                case 17:
                case 'end':
                    return context$2$0.stop();
            }
        }, null, _this, [[0, 14]]);
    });
}

module.exports = exports['default'];