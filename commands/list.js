const {MessageEmbed} = require('discord.js');

module.exports = {
    name: 'list',
    description: 'gives the list of all commands.',
    format: `${process.env.PREFIX}list`,
    execute(message, args){
        //console.log(message.client.commands.values());
        let embed = new MessageEmbed()
                        .setTitle('List of Supported Commands')
                        .setDescription('The following commands are currently supported')
                        .setColor('#c60a0a');
        let count=1;
        let inline=true;
        for (const cmd of message.client.commands.values()){
            if(count === 3) inline=false;
            embed.addField(cmd.name,cmd.format,inline);
            if(count === 3) inline=true;
            count = (count+1)%3;
        }
        message.channel.send(embed);
    }
}