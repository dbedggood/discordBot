const request = require('request')

exports.getCityWeather = (msg) => {
  const city = msg.content.split(/weather /i)[1]

  const options = {
    url:
      'https://api.openweathermap.org/data/2.5/weather?q=' +
      city +
      '&units=metric&appid=' +
      process.env.WEATHER_API_KEY,
    headers: {
      Accept: 'application/json'
    }
  }

  function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
      const content = JSON.parse(body)
      msg.channel.send(
        content.name +
          ', ' +
          content.sys.country +
          ': \n' +
          '\t Weather: ' +
          content.weather[0].main +
          '\n' +
          '\t Temperature: ' +
          content.main.temp +
          '°C'
      )
    } else {
      msg.channel.send('City not found!')
    }
  }

  request(options, callback)
}
