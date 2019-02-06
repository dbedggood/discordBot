require('dotenv').config()

const Youtube = require('simple-youtube-api')
const Discord = require('discord.js')
const request = require('request')
const ytdl = require('ytdl-core')

const youtube = new Youtube(process.env.GOOGLE_API_KEY)
const bot = new Discord.Client({disableEveryone: true})
const prefix = ',';

bot.login(process.env.BOT_TOKEN)

bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}!`)
  bot.user.setActivity('everyone very closely... type ,help for help!', { type: 'WATCHING'})
})

bot.on('message', async msg => {

  // to prevent the bot from talking to itself or other bots
  if (msg.author.bot) {return}

  // dad joke feature
  if (Math.random() >= 0.9) {
    if (msg.content.match(/i'm/i)) {
      msg.channel.send("Hi " + msg.content.split(/i'm /i)[1] + ', I\'m waery! 😎')
    } else if (msg.content.match(/i am/i)) {
      msg.channel.send("Hi " + msg.content.split(/i am /i)[1] + ', I\'m waery! 😎')
    }
  }

  // ignore if message does not start with the prefix
  if (!msg.content.startsWith(prefix)) {return}

  const args = msg.content.split(' ')

  if (msg.content.startsWith(prefix + 'play')) {

    const vChannel = msg.member.voiceChannel
    if (!vChannel) {return msg.channel.send('You need to be in a voice channel to play music!')}
    
    const perms = vChannel.permissionsFor(msg.client.user)
    if (!perms.has('CONNECT')) {return msg.channel.send('I don\'t have permission to enter your voice channel!')}
    if (!perms.has('SPEAK')) {return msg.channel.send('I don\'t have permission to play music in this channel!')}

    try {
      var connection = await vChannel.join()
    } catch(error) {
      console.error('I could not join the voice channel because: ' + error)
      return msg.channel.send("I could not join the voice channel!")
    }

    const dispatcher = connection.playStream(ytdl(args[1]))
      .on('end', () => {
        console.log('The song has ended.')
        vChannel.leave()
      })
      .on('error', error => {
        console.log(error)
      })

    dispatcher.setVolumeLogarithmic(1/2)

  } else if (msg.content.startsWith(prefix + 'stop')) {
    if (!msg.member.voiceChannel) {return msg.channel.send('You are not in the voice channel.')}
    msg.member.voiceChannel.leave()
  }

  // help text
  if (msg.content.startsWith(prefix + 'help')) {
    msg.channel.send('Current commands include: \n'
                      + '\t `yt` or - lets you search youtube videos to add to the chat \n'
                      + '\t `joke` - tells you a random dad joke \n'
                      + '\t `xkcd` - retrieves a random xkcd comic \n'
                      + '\t `weather` - shows you the current weather for a city \n\n' 
                      + '*Remember to start your commands with* `' + prefix + '`'
    )
  }

  if (msg.content.startsWith(prefix + 'bust')) {
    msg.channel.send('stalks busted')
  }

  // random joke feature
  if (msg.content.startsWith(prefix + 'joke')) {
    const options = {
      url: 'https://icanhazdadjoke.com',
      headers: {
        'Accept': 'application/json'
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

  // youtube search
  if (msg.content.startsWith(prefix + 'yt')) {
    
    // everything after yt is the search string, limited to 5 results to avoid clutter
    youtube.searchVideos(msg.content.split(/yt /i)[1], 5)
      .then(results => {
        msg.channel.send('Reply with 1-5 to choose a video: \n'
                          + '1 - ' + results[0].title + '\n'
                          + '2 - ' + results[1].title + '\n'
                          + '3 - ' + results[2].title + '\n'
                          + '4 - ' + results[3].title + '\n'
                          + '5 - ' + results[4].title)
        
        // collects a response only from the original user, dies after 10 seconds
        const collector = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 10000, maxMatches: 1 });
        collector.on('collect', message => {
            switch (message.content) {
              case '1':
                message.channel.send(results[0].url)
                break;
              case '2':
                message.channel.send(results[1].url)
                break;
              case '3':
                message.channel.send(results[2].url)
                break;
              case '4':
                message.channel.send(results[3].url)
                break;
              case '5':
                message.channel.send(results[4].url)
                break;
              default:
                break;
          }
        })
      })
      .catch(console.log);
  }

  // weather
  if (msg.content.startsWith(prefix + 'weather')) {
    
    const city = msg.content.split(/weather /i)[1]

    const options = {
      url: 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric&appid=' +  process.env.WEATHER_API_KEY,
      headers: {
        'Accept': 'application/json'
      }
    }
    
    function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
        const content = JSON.parse(body)
        msg.channel.send(content.name + ', ' + content.sys.country + ': \n' 
                          + '\t Weather: ' + content.weather[0].main + '\n'
                          + '\t Temperature: ' + content.main.temp + '°C')
      }

      else {
        msg.channel.send('City not found!')
      }
    }
    
    request(options, callback)

  }

  // xkcd
  if (msg.content.startsWith(prefix + 'xkcd')) {

    const options = {
      url: 'https://xkcd.com/info.0.json',
      headers: {
        'Accept': 'application/json'
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
            'Accept': 'application/json'
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

})