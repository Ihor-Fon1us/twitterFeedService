const request = require('request');

const time = process.env.TIME || 10;

const baseUrl = process.env.SERVER_BASE_URL || 'http://localhost:3000';

let t = 0;

const options = {
  url: `${baseUrl}/post`,
  json: true,
  body: {
    nickname: 'Bot',
    text: t,
  },
};

const sendTwitt = () =>
{
  options.body.text = t++;
  request.post(options, (err, res, body) => {
    if (err) {
      return console.log(err);
    }
    console.log(`Status: ${res.statusCode}`);
    console.log(body);
  });
};

setInterval(sendTwitt, time);
