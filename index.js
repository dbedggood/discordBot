require('dotenv').config()

const Discord = require('discord.js')
const bot = new Discord.Client({ disableEveryone: true })
const prefix = ','

const dad = require('./functions/dad.js')
const help = require('./functions/help.js')
const joke = require('./functions/joke.js')
const music = require('./functions/music.js')
const roast = require('./functions/roast.js')
const xkcd = require('./functions/xkcd.js')
const weather = require('./functions/weather.js')
const video = require('./functions/video.js')

bot.login(process.env.BOT_TOKEN)

bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}!`)
  bot.user.setActivity('everyone very closely... type ,help for help!', {
    type: 'WATCHING'
  })
})

bot.on('message', async (msg) => {
  // to prevent the bot from talking to itself or other bots
  if (msg.author.bot) {
    return
  }

  // check for dad joke opportunity
  if (Math.random() >= 0.95) {
    dad.joke(msg)
  }

  // ignore if message does not start with the prefix
  if (!msg.content.startsWith(prefix)) {
    return
  }

  // control music
  if (msg.content.startsWith(prefix + 'play')) {
    music.play(msg)
  } else if (msg.content.startsWith(prefix + 'skip')) {
    music.skip(msg)
  } else if (msg.content.startsWith(prefix + 'stop')) {
    music.stop(msg)
  }

  // help text
  if (msg.content.startsWith(prefix + 'help')) {
    help.display(msg, prefix)
  }

  // for busting stalks
  if (msg.content.startsWith(prefix + 'bust')) {
    msg.channel.send('stalks busted')
  }

  // random joke feature
  if (msg.content.startsWith(prefix + 'joke')) {
    joke.random(msg)
  }

  // roast
  if (msg.content.startsWith(prefix + 'roast')) {
    roast.random(msg)
  }

  // youtube search
  if (msg.content.startsWith(prefix + 'yt')) {
    video.getYoutubeLink(msg)
  }

  // weather
  if (msg.content.startsWith(prefix + 'weather')) {
    weather.getCityWeather(msg)
  }

  // xkcd
  if (msg.content.startsWith(prefix + 'xkcd')) {
    xkcd.random(msg)
  }
})
