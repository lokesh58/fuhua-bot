module.exports = {
    name: 'thanks',
    description: 'this is thanks command!',
    execute(message, args){
        if(!message.member.hasPermission('MANAGE_CHANNELS'))
            return message.reply('you don\'t have the permission to use this command');
        message.react('🔈');
        message.channel.send('Maintain Discipline from now on <:fuhuaSmile:800929579199496233>');
        message.channel.updateOverwrite(message.channel.guild.roles.everyone, { SEND_MESSAGES: null });
    }
}