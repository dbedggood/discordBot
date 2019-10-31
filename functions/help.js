exports.display = (msg, prefix) => {
  msg.channel.send(
    'Current commands include: \n' +
      '\t `yt` - lets you search youtube videos to add to the chat \n' +
      '\t `joke` - tells you a random dad joke \n' +
      '\t `roast` - roasts you 🔥🔥  \n' +
      '\t `roll` - rolls a random number from 1 up to the number you input \n' +
      '\t `xkcd` - retrieves a random xkcd comic \n' +
      '\t `weather` - shows you the current weather for a city \n\n' +
      '\t `play` - plays a youtube link in a voice channel, adds to queue if a song is already playing \n' +
      '\t\t `skip` - skips the currently playing song \n' +
      '\t\t `stop` - ends the music \n\n' +
      '*Remember to start your commands with* `' +
      prefix +
      '`'
  )
}
