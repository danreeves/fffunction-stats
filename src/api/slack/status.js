import slack from '../../lib/slack.js';

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

export default async function status () {
    const usersResponse = await slack.getUsers();
    const allMembers = JSON.parse(usersResponse.body).members;
    const memberStatus = await Promise.all(allMembers.map((user) => slack.userStatus(user.id)));
    return await memberStatus.map(emailToStatus(allMembers)).filter(v => v !== undefined);
}
