module.exports = {
    name: 'list',
    description: 'gives the list of all commands.',
    execute(message, args){
        //console.log(message.client.commands.values());
        let cmdList = [];
        for (const cmd of message.client.commands.values()){
            cmdList.push(cmd.name);
        }
        message.channel.send(`The following commands are currently supported:\n${cmdList.toString()}`);
    }
}