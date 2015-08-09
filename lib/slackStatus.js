import 'babel/polyfill';
import slack from './slack.js';

const allUsers = slack.getUsers();
let members = [];

const userStatus = function userStatus (user) {
    return slack.userStatus(user.id);
};
const mapStatus = function mapStatus (v, i) {
    if (String(members[i].profile.email).includes('@fffunction.co') &&
        members[i].deleted !== true) {
        return { [members[i].profile.email]: JSON.parse(v.body).presence };
    }
};

export default function slackStatus () {
    return new Promise(function (resolve, reject) {

        allUsers.then(function gotUsers (data) {
            members = JSON.parse(data.body).members;
            return Promise.all(members.map(userStatus));
        })
        .then(function gotStatus (data) {
            const mappedUsers = data.map(mapStatus).filter(v => v != undefined);
            resolve(mappedUsers.reduce(function (a, b) {
                return { ...a, ...b };
            }), {});
        })
        .catch(reject);

    });
}
