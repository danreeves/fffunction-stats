import path from 'path';

export default function addPathsTo (app) {
    return function addPaths (obj, url) {
        if (typeof obj === 'object') {
            Object.keys(obj).forEach(segment => {
                addPaths(obj[segment], path.join(url, segment));
            });
        } else {
            app.get(url, async (req, res) => {
                console.log('Request  ->', url);
                const data = await obj();
                res.json(data);
                console.log('Response ->', data);
            });
            console.log('Route added:', url);
        }
    };
}
