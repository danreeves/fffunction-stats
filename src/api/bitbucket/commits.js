import bitbucket from '../../lib/bitbucket.js';
const fffUsernames = require('../../data/bitbucket.json');

async function getAllRepos () {
    let repos = [];

    async function getRepos (page = 1) {
        const repoResponse = await bitbucket.getRepos(page);
        const body = JSON.parse(repoResponse.body);
        repos = repos.concat(body.values.map(repo => repo.full_name.replace(/.*\//, '')));
        if ('next' in body) await getRepos(page + 1);
    }

    await getRepos(1);
    return repos;

}

function countUserCommits (a, b) {
    try {
        if (b.author.user.username in a) a[b.author.user.username]++;
        else a[b.author.user.username] = 1;
    } catch (e) {
        // key error if bitbucket user doesn't exist
    }
    return a;
}


export default async function getBitbucketCommitCount () {
    const repos = await getAllRepos();
    const allCommitResponses = await Promise.all(repos.map(repo => bitbucket.getCommitsOf(repo)));
    const allCommits = allCommitResponses.reduce((a, b) => {
        if (b.response.statusCode >= 200 && b.response.statusCode < 300) {
            const vals = JSON.parse(b.body).values;
            a = a.concat(vals);
        }
        return a;
    }, []);
    const commitCount = allCommits.reduce(countUserCommits, {});
    return Object.keys(commitCount).map(user => ({
        username: user,
        commits: commitCount[user],
    }));

}
