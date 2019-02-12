const request = require('request')

exports.random = (msg) => {
  const options = {
    url: 'https://icanhazdadjoke.com',
    headers: {
      Accept: 'application/json'
    }
  }

  function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
      const content = JSON.parse(body)
      msg.channel.send(content.joke)
    }
  }

  request(options, callback)
}
