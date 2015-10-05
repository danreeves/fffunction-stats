import slack from '../lib/slack.js';

const allUsers = slack.getUsers();
let members = [];

const userStatus = function userStatus (user) {
    return slack.userStatus(user.id);
};
const mapStatus = function mapStatus (v, i) {
    if (String(members[i].profile.email).includes('@fffunction.co') &&
        members[i].deleted !== true) {
        return {
            email: members[i].profile.email,
            status: JSON.parse(v.body).presence,
        };
    }
};

export default function slackStatus () {
    return new Promise((resolve, reject) => {

        allUsers.then(function gotUsers (data) {
            members = JSON.parse(data.body).members;
            return Promise.all(members.map(userStatus));
        })
        .then(function gotStatus (data) {
            const mappedUsers = data.map(mapStatus).filter(v => v !== undefined);
            resolve(mappedUsers);
        })
        .catch(reject);

    });
}
