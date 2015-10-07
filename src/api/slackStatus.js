import slack from '../lib/slack.js';

const getUserStatus = function getUserStatus (user) {
    return slack.userStatus(user.id);
};

const emailToStatus = function emailToStatus (members) {
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

export default async function slackStatus () {
    const usersResponse = await slack.getUsers();
    const allMembers = JSON.parse(usersResponse.body).members;
    const memberStatus = await Promise.all(allMembers.map(getUserStatus));
    return await memberStatus.map(emailToStatus(allMembers)).filter(v => v !== undefined);
}
