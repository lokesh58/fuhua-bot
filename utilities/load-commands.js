const fs = require('fs')
const {Collection} = require('discord.js')

module.exports = (client) => {
    client.commands = new Collection()
    const commandFiles = fs.readdirSync('./commands/').filter(file=>file.endsWith('.js'))
    for(const file of commandFiles){
        const command = require(`../commands/${file}`)
        client.commands.set(command.name, command)
    }
    client.on('message', message=>{
        const prefix = process.env.PREFIX
        if(message.author?.bot || message.channel.type === 'dm') return;
        if(message.content.startsWith(prefix)){
            const args = message.content.slice(prefix.length).split(/ +/)
            const command = args.shift().toLowerCase()
        
            const cmd = client.commands.get(command)
            if(cmd){
                cmd.execute(message, args)
            }else{
                message.reply(`This is not a valid command!\nHint: To get list of all valid commands, use ${prefix}list`)
            }
        }
    });
}