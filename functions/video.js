const Discord = require('discord.js')
const Youtube = require('simple-youtube-api')
const youtube = new Youtube(process.env.GOOGLE_API_KEY)

exports.getYoutubeLink = (msg) => {
  // everything after yt is the search string, limited to 5 results to avoid clutter
  youtube
    .searchVideos(msg.content.split(/yt /i)[1], 5)
    .then((results) => {
      msg.channel.send(
        'Reply with 1-5 to choose a video: \n' +
          '1 - ' +
          results[0].title +
          '\n' +
          '2 - ' +
          results[1].title +
          '\n' +
          '3 - ' +
          results[2].title +
          '\n' +
          '4 - ' +
          results[3].title +
          '\n' +
          '5 - ' +
          results[4].title
      )

      // collects a response only from the original user, dies after 10 seconds
      const collector = new Discord.MessageCollector(
        msg.channel,
        (m) => m.author.id === msg.author.id,
        { time: 10000, maxMatches: 1 }
      )

      collector.on('collect', (message) => {
        switch (message.content) {
          case '1':
            message.channel.send(results[0].url)
            break
          case '2':
            message.channel.send(results[1].url)
            break
          case '3':
            message.channel.send(results[2].url)
            break
          case '4':
            message.channel.send(results[3].url)
            break
          case '5':
            message.channel.send(results[4].url)
            break
          default:
            break
        }
      })
    })
    .catch(console.log)
}
