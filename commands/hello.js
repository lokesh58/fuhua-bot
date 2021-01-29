module.exports = {
    name: 'hello',
    description: 'this is greeting command!',
    format:'!hello',
    execute(message, args){
        message.channel.send('Hello, I\'m Fu Hua, the class monitor');
    }
}