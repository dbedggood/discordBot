exports.random = msg => {
  const maxNumber = parseInt(msg.content.split(' ')[1])
  const randomNumber = Math.ceil(Math.random() * maxNumber)
  msg.channel.send(randomNumber)
}
