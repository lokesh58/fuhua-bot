require('dotenv').config();
require('module-alias/register');
const {Client} = require('discord.js');

const client = new Client({partials: ["MESSAGE", "CHANNEL", "REACTION"]});

const prefix = '!';

client.once('ready', ()=>{
    const utilityFiles = fs.readdirSync('./utilities/').filter(file=>file.endsWith('.js'));
    for(const file of utilityFiles){
        const utility = require(`./utilities/${file}`);
        utility(client);
    }
    console.log('Fu Hua is online');
});

client.login(process.env.BOT_TOKEN);
//Have nothing below