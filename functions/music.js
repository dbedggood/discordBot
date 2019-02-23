const ytdl = require('ytdl-core')
const queue = new Map()

function start(msg, song) {
  const serverQueue = queue.get(msg.guild.id)
  
  if (!song) {
    serverQueue.voiceChannel.leave()
    queue.delete(msg.guild.id)
    return
  }

  console.log(serverQueue.songs)
  
  const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
    .on('end', () => {
      serverQueue.songs.shift()
      start(msg, serverQueue.songs[0])
    })
    .on('error', (error) => {
      console.log(error)
    })

  dispatcher.setVolumeLogarithmic(3/5)
  return msg.channel.send(song.title + ' is now playing.')

}

exports.play = async (msg) => {
  const youtubeLink = msg.content.split(/play /i)[1]
  const serverQueue = queue.get(msg.guild.id)

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

  const songInfo = await ytdl.getInfo(youtubeLink)
  const song = {
    title: songInfo.title,
    url: songInfo.video_url
  }

  if (!serverQueue) {
    const queueConstruct = {
      textChannel: msg.channel,
      voiceChannel: vChannel,
      connection: null,
      songs: [],
      playing: true
    }
    queue.set(msg.guild.id, queueConstruct)
    queueConstruct.songs.push(song)
    
    try {
      var connection = await vChannel.join()
      queueConstruct.connection = connection
      start(msg, queueConstruct.songs[0])
    } catch (error) {
      console.error('I could not join the voice channel because: ' + error)
      queue.delete(msg.guild.id)
      return msg.channel.send('I could not join the voice channel!')
    }
  } else {
    serverQueue.songs.push(song)
    console.log(serverQueue.songs)

    return msg.channel.send(song.title + ' has been added to the queue.')
  }

}

exports.skip = (msg) => {
  const serverQueue = queue.get(msg.guild.id)
  if (!msg.member.voiceChannel) {
    return msg.channel.send('You are not in the voice channel.')
  }
  if (!serverQueue) {
    return msg.channel.send('There is nothing to skip.')
  }
  serverQueue.connection.dispatcher.end()
}

exports.stop = (msg) => {
  if (!msg.member.voiceChannel) {
    return msg.channel.send('You are not in the voice channel.')
  }
  msg.member.voiceChannel.leave()
  queue.delete(msg.guild.id)
}
