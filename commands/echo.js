module.exports = {
    name: 'echo',
    description: 'Echo whatever you give after the command.',
    format:'!echo <sentence>',
    execute(message, args){
        if(args.length === 0)
            return message.reply('please specify something to echo!');
        message.delete();
        message.channel.send(args.join(' '));
    }
}