const Discord = require('discord.js');

const client = new Discord.Client();

const prefix = '!';

const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file=>file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.once('ready', ()=>{
    console.log('Fu Hua is online');
});

client.on('message', message=>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    const cmd = client.commands.get(command);
    if(cmd){
        cmd.execute(message, args);
    }else{
        message.reply('This is not a valid command!\nHint: To get list of all valid commands, use !list');
    }
});

client.login('ODAxMDkyODc4MTIxMzA0MDky.YAbp4Q.aGr5WVenBENDpxiAbxTb3-WS5oQ');
//Have nothing below