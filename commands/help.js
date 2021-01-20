module.exports = {
    name: 'help',
    description: 'gives the use of commands.\nFormat: !help <command name>',
    execute(message, args){
        if(args.length === 0)
            return message.reply('please specify command!\nHint: To get list of commands use !list');
        const cmd = message.client.commands.get(args[0]);
        if(cmd){
            message.channel.send(`${cmd.description}`);
        }else{
            message.channel.send('The command doesn\'t exist');
        }
    }
}