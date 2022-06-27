const request = require('request');

const time = process.env.TIME || 2000;

const options = {
    url: 'http://localhost:3000/post',
    json: true,
    body: {
        nickname: 'Bot',
        text: 'Helloworld'
    }
};

const sendTwitt = () => {
    return request.post(options, (err, res, body) => {
        if (err) {
            return console.log(err);
        }
        console.log(`Status: ${res.statusCode}`);
        console.log(body);
    });
}

setInterval (sendTwitt, time);