module.exports = {
    name: 'shh',
    description: 'Stops everyone from sending any message in the channel!',
    format:`${process.env.PREFIX}shh`,
    execute(message, args){
        if(!message.member.hasPermission('MANAGE_CHANNELS'))
            return message.reply('you don\'t have the permission to use this command');
        message.react('🔇');
        message.channel.updateOverwrite(message.channel.guild.roles.everyone, { SEND_MESSAGES: false });
    }
}