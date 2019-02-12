exports.joke = (msg) => {
    if (msg.content.match(/i'm/i)) {
        msg.channel.send(
          'Hi ' + msg.content.split(/i'm /i)[1] + ", I'm waery! 😎"
        )
    } else if (msg.content.match(/i am/i)) {
        msg.channel.send(
            'Hi ' + msg.content.split(/i am /i)[1] + ", I'm waery! 😎"
        )
    }
}