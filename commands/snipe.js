const cache = require('@cache/snipe-cache')
const {MessageEmbed} = require('discord.js')

module.exports = {
    name: 'snipe',
    description: 'Snipes the last deleted message in the channel',
    format: '!snipe',
    execute(message, args){
        const {channel} = message
        const channelID = channel.id
        const info = cache[channelID]
        if(info){
            const embed = new MessageEmbed()
                                .setTitle(info.user)
                                .setDescription(info.content)
                                .setColor('#c60a0a')
            channel.send(embed)
            delete cache[channelID]
        }else{
            channel.send('There is nothing to snipe!')
        }
    }
}