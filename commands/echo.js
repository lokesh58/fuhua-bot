module.exports = {
    name: 'echo',
    description: 'Echo whatever you give after the command.\nFormat: !echo <sentence>',
    execute(message, args){
        if(args.length === 0)
            return message.reply('please specify something to echo!');
        message.channel.send(args.join(' '));
    }
}