const {
    START_MESSAGE,
    getNameError,
    getCapitalizedName,
    request,
} = require('./modules');

const http = require('http');
const server = http.createServer().listen(3000);

server.on('request', (req, res) => {
    if (req.url === '/') {
        return res.end(START_MESSAGE);
    };

    const nameFromUrl = req.url.slice(1);

    request(nameFromUrl)
    .then(data => {
        const name = getCapitalizedName(data.name);
        const gender = data.gender;
        const probability = (Math.trunc(data.probability * 100));

        if (!gender) {
            throw new Error(getNameError(name));
        };
        
        res.end(`The name ${name} is ${gender} with a probability of ${probability}%`);
    })
    .catch(error => res.end(error.message));
});