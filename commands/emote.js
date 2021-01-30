module.exports = {
    name: 'emote',
    description: 'Echo the emote specified (even animated ones 😉)',
    format:'!emote <emote name>',
    execute(message, args){
        if(args.length === 0)
            return message.reply('please specify emote!');
        
        const emote = message.client.emojis.cache.find(emoji => emoji.name.toLowerCase() === args[0].toLowerCase());
        if(emote){
            message.delete();
            message.channel.send(`${emote}`);
            message.channel.send(`(${message.member.displayName})`);
        }else{
            message.channel.send('I don\'t have access to that emote');
        }
    }
}