import bitbucket from '../../lib/bitbucket.js';

export default async function getBitbucketCommitCount () {
    const response = await bitbucket.getCommitsOf('beacontest');
    const commits = JSON.parse(response.body);
    return commits.values;
}
