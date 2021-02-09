const cache = require('@cache/editsnipe-cache')
const {MessageEmbed} = require('discord.js')

module.exports = {
    name: 'editsnipe',
    description: 'Snipes the last edited message in the channel',
    format: `${process.env.PREFIX}editsnipe`,
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