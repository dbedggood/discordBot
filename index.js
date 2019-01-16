require('dotenv').config()

const Youtube = require('simple-youtube-api')
const Discord = require('discord.js')
const request = require('request');

const youtube = new Youtube(process.env.GOOGLE_API_KEY)
const bot = new Discord.Client()
const prefix = ",";

bot.login(process.env.BOT_TOKEN)

bot.on('ready', () => { console.log(`Logged in as ${bot.user.tag}!`) })

bot.on('message', msg => {

  // to prevent the bot from talking to itself or other bots
  if (!msg.author.bot) {
    if (msg.content.startsWith(prefix)) {

      if (msg.content.startsWith(prefix + "help")) {
        msg.channel.send("Current commands include: \n yt - lets you search youtube videos to add to the chat \n joke - tells you a random dad joke")
      }

      // dad joke feature
      if (msg.content.startsWith(prefix + "joke")) {
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
      if (msg.content.startsWith(prefix + "yt")) {
        
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
    }

    // dad joke feature pt2
    if (Math.random() >= 0.8) {
      if (msg.content.match(/i'm/i)) {
        msg.channel.send("Hi " + msg.content.split(/i'm /i)[1] + ", I'm waery! 😎")
      } else if (msg.content.match(/i am/i)) {
        msg.channel.send("Hi " + msg.content.split(/i am /i)[1] + ", I'm waery! 😎")
      }
    }
    
  }

})