const ytdl = require('ytdl-core')

exports.play = async (msg) => {
  const youtubeLink = msg.content.split(/play /i)[1]

  const vChannel = msg.member.voiceChannel
  if (!vChannel) {
    return msg.channel.send('You need to be in a voice channel to play music!')
  }

  const perms = vChannel.permissionsFor(msg.client.user)
  if (!perms.has('CONNECT')) {
    return msg.channel.send(
      "I don't have permission to enter your voice channel!"
    )
  }
  if (!perms.has('SPEAK')) {
    return msg.channel.send(
      "I don't have permission to play music in this channel!"
    )
  }

  try {
    var connection = await vChannel.join()
  } catch (error) {
    console.error('I could not join the voice channel because: ' + error)
    return msg.channel.send('I could not join the voice channel!')
  }

  const dispatcher = connection
    .playStream(ytdl(youtubeLink))
    .on('end', () => {
      console.log('The song has ended.')
      vChannel.leave()
    })
    .on('error', (error) => {
      console.log(error)
    })

  dispatcher.setVolumeLogarithmic(1 / 2)
}

exports.stop = (msg) => {
  if (!msg.member.voiceChannel) {
    return msg.channel.send('You are not in the voice channel.')
  }
  msg.member.voiceChannel.leave()
}
