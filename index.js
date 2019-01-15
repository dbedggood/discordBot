require('dotenv').config()

const Youtube = require('simple-youtube-api')
const Discord = require('discord.js')

const youtube = new Youtube(process.env.GOOGLE_API_KEY)
const bot = new Discord.Client()

bot.login(process.env.BOT_TOKEN)

bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}!`)
})

// bot.on('typingStart', (channel) => {
//   channel.send("shut up")
// })
// bot.on('typingStop', (channel) => {
//   channel.send("good <:waery:534517623115874315>")
// })

bot.on('message', msg => {
  // console.log(msg.content)

  if (!msg.author.bot) {

    if (msg.content.match(/i'm/i)) {
      msg.channel.send("Hi " + msg.content.split(/i'm /i)[1] + ", I'm waery <:waery:534517623115874315>");
    } else if (msg.content.match(/i am/i)) {
      msg.channel.send("Hi " + msg.content.split(/i am /i)[1] + ", I'm waery <:waery:534517623115874315>");
    }

    if (msg.content.match(/yt/i)) {
      youtube.searchVideos(msg.content.split(/yt /i)[1], 5)
        .then(results => {
          msg.channel.send('Reply with 1-5 to choose a video: \n'
                            + '1 - ' + results[0].title + '\n'
                            + '2 - ' + results[1].title + '\n'
                            + '3 - ' + results[2].title + '\n'
                            + '4 - ' + results[3].title + '\n'
                            + '5 - ' + results[4].title)
          
          const collector = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 10000 });
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

})