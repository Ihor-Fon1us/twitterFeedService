const request = require('request');

const time = process.env.TIME || 10;

const baseUrl = process.env.SERVER_BASE_URL || 'http://localhost:3000';

const options = {
  url: `${baseUrl}/post`,
  json: true,
  body: {
    nickname: 'Bot',
    text: 'Helloworld',
  },
};

const sendTwitt = () => request.post(options, (err, res, body) => {
  if (err) {
    return console.log(err);
  }
  console.log(`Status: ${res.statusCode}`);
  console.log(body);
});

setInterval(sendTwitt, time);
