exports.display = (msg, prefix) => {
  msg.channel.send(
    'Current commands include: \n' +
      '\t `yt` - lets you search youtube videos to add to the chat \n' +
      '\t `play` - plays a youtube link in a voice channel, `stop` to end it \n' +
      '\t `joke` - tells you a random dad joke \n' +
      '\t `roast` - roasts you. 🔥🔥  \n' +
      '\t `xkcd` - retrieves a random xkcd comic \n' +
      '\t `weather` - shows you the current weather for a city \n\n' +
      '*Remember to start your commands with* `' +
      prefix +
      '`'
  )
}
