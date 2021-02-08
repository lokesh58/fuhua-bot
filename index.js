require('dotenv').config();
require('module-alias/register');
const Discord = require('discord.js');

const client = new Discord.Client({partials: ["MESSAGE", "CHANNEL", "REACTION"]});

const prefix = '!';

const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file=>file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

const utilityFiles = fs.readdirSync('./utilities/').filter(file=>file.endsWith('.js'));

client.once('ready', ()=>{
    for(const file of utilityFiles){
        const utility = require(`./utilities/${file}`);
        utility(client);
    }
    console.log('Fu Hua is online');
});

const fakeNitro = require('./misc/fake-ntiro')

client.on('message', message=>{
    if(message.author.bot) return;
    if(message.content.startsWith(prefix)){
        const args = message.content.slice(prefix.length).split(/ +/);
        const command = args.shift().toLowerCase();
    
        const cmd = client.commands.get(command);
        if(cmd){
            cmd.execute(message, args);
        }else{
            message.reply('This is not a valid command!\nHint: To get list of all valid commands, use !list');
        }
    }else{
        fakeNitro(message);
    }
});

client.login(process.env.BOT_TOKEN);
//Have nothing below