const request = require('request')

exports.random = (msg) => {
  const options = {
    url: 'https://insult.mattbas.org/api/insult',
  }

  function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
      msg.channel.send(body + '.')
    }
  }

  request(options, callback)
}
