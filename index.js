require('dotenv').config()

const Discord = require('discord.js')
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
  console.log(msg.content)

  if (!msg.author.bot) {

    if (msg.content.match(/i'm/i)) {
      msg.channel.send("Hi " + msg.content.split(/i'm /i)[1] + ", I'm waery <:waery:534517623115874315>");
    } else if (msg.content.match(/i am/i)) {
      msg.channel.send("Hi " + msg.content.split(/i am /i)[1] + ", I'm waery <:waery:534517623115874315>");
    }
  
  }

})