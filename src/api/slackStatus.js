import slack from '../lib/slack.js';

const userStatus = function userStatus (user) {
    return slack.userStatus(user.id);
};
const mapStatus = function mapStatus (members) {
    return (v, i) => {
        if (String(members[i].profile.email).includes('@fffunction.co') &&
            members[i].deleted !== true) {
            return {
                email: members[i].profile.email,
                status: JSON.parse(v.body).presence,
            };
        }
    };
};

export default function slackStatus () {
    return new Promise(async (resolve) => {

        const usersResponse = await slack.getUsers();
        const members = JSON.parse(usersResponse.body).members;
        const memberStatus = await Promise.all(members.map(userStatus));
        const mappedUsers = await memberStatus.map(mapStatus(members)).filter(v => v !== undefined);
        resolve(mappedUsers);

    });
}
