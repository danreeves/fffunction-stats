import path from 'path';

export default function addPathsTo (app) {
    return function addPaths (obj, url) {
        if (typeof obj === 'object') {
            Object.keys(obj).forEach(segment => {
                addPaths(obj[segment], path.join(url, segment));
            });
        } else {
            app.get(url, async (req, res) => {
                const data = await obj();
                res.json(data);
                console.log('Request  ->', url);
                console.log('Response ->', data);
            });
            console.log('Route added:', url);
        }
    };
}
