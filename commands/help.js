const {MessageEmbed} = require('discord.js');

module.exports = {
    name: 'help',
    description: 'gives the use of commands.',
    format:'!help <command name>',
    execute(message, args){
        if(args.length === 0)
            return message.reply('please specify command!\nHint: To get list of commands use !list');
        const cmd = message.client.commands.get(args[0].toLowerCase());
        if(cmd){
            let embed = new MessageEmbed()
                            .setTitle(`${cmd.name}`)
                            .setDescription(`${cmd.description}`)
                            .addField('Format', `${cmd.format}`)
                            .setColor('#c60a0a');
            message.channel.send(embed);
        }else{
            message.channel.send('The command doesn\'t exist');
        }
    }
}