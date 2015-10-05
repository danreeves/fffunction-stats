'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = slackStatus;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _libSlackJs = require('../lib/slack.js');

var _libSlackJs2 = _interopRequireDefault(_libSlackJs);

var allUsers = _libSlackJs2['default'].getUsers();
var members = [];

var userStatus = function userStatus(user) {
    return _libSlackJs2['default'].userStatus(user.id);
};
var mapStatus = function mapStatus(v, i) {
    if (String(members[i].profile.email).includes('@fffunction.co') && members[i].deleted !== true) {
        return {
            email: members[i].profile.email,
            status: JSON.parse(v.body).presence
        };
    }
};

function slackStatus() {
    return new Promise(function (resolve, reject) {

        allUsers.then(function gotUsers(data) {
            members = JSON.parse(data.body).members;
            return Promise.all(members.map(userStatus));
        }).then(function gotStatus(data) {
            var mappedUsers = data.map(mapStatus).filter(function (v) {
                return v !== undefined;
            });
            resolve(mappedUsers);
        })['catch'](reject);
    });
}

module.exports = exports['default'];