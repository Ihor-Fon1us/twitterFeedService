const request = require('request');

const time = process.env.TIME || 10;

const options = {
  url: 'http://localhost:3000/post',
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
