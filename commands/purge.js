module.exports = {
    name: 'purge',
    description: 'Delete specified number of messages from channel. Keep in mind the command is also counted in it.\nFormat: !purge <count>',
    async execute(message, args){
        if(!message.member.hasPermission('MANAGE_MESSAGES'))
            return message.reply('you don\'t have the permission to use this command');
        if(!args[0]) return message.reply('please enter amount of messages to delete!');
        if(isNaN(args[0])) return message.reply('amount must be a number!');

        if(args[0] > 100) return message.reply('you cannot delete more than 100 messages');
        if(args[0] < 1) return message.reply('you must delete atleast one message');

        await message.channel.messages.fetch({limit: args[0]}).then(messages => {
            message.channel.bulkDelete(messages);
        });
    }
}