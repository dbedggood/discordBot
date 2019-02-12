const request = require('request')

exports.random = (msg) => {
  const options = {
    url: 'https://xkcd.com/info.0.json',
    headers: {
      Accept: 'application/json'
    }
  }

  function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
      const content = JSON.parse(body)

      const max = Math.floor(content.num) + 1
      const comicNum = Math.floor(Math.random() * max)

      const options = {
        url: 'https://xkcd.com/' + comicNum + '/info.0.json',
        headers: {
          Accept: 'application/json'
        }
      }

      request(options, (error, response, body) => {
        if (!error && response.statusCode == 200) {
          const content = JSON.parse(body)
          msg.channel.send(content.img)
        }
      })
    }
  }

  request(options, callback)
}
