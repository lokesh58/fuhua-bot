const mongo = require('@utils/mongo.js');
const faqSchema = require('@schemas/faq-schema.js');

const {MessageEmbed} = require('discord.js');

const cache = {};

const addFAQ = async (name, description)=>{
    cache[name] = description;
    await mongo().then(async (mongoose) => {
        try{
            await faqSchema.findOneAndUpdate({
                name: name
            },{
                name: name,
                description: description
            },{
                upsert: true
            });
        }finally{
            mongoose.connection.close();
        }
    }).catch(console.error);
}

const findFAQ = async (name) => {
    let data = cache[name];
    if(!data){
        console.log('Fetching from database');
        await mongo().then(async (mongoose) => {
            try{
                await faqSchema.findOne({name: name}).then((result)=>{
                    if(result) cache[name] = data = result.description;
                });
            }finally{
                mongoose.connection.close();
            }
        }).catch(console.error);
    }
    return data;
}

module.exports = {
    name: 'faq',
    description: 'Quickly send an faq in chat',
    format: '!faq <faq name/id>',
    async execute(message, args){
        if(args.length === 0){
            return message.reply('please use the correct format: !faq <faq name/id>');
        }
        if(args[0].toLowerCase() === 'add'){
            if(args.length < 3){
                return message.reply('please specify the name and description for the FAQ');
            }
            args.shift();
            const name = args.shift().toLowerCase();
            if(name === 'add'){
                return message.reply('name of faq cannot be "add"');
            }
            const description = args.join(' ');
            await addFAQ(name, description);
            message.channel.send(`FAQ "${name}" was successfully created`);
        }else{
            const name = args[0].toLowerCase();
            const faq = await findFAQ(name);
            if(!faq){
                message.channel.send(`FAQ "${name}" was not found`);
            }else{
                let embed = new MessageEmbed()
                        .setTitle(`${name}`)
                        .setDescription(`${faq}`)
                        .setColor('#c60a0a'); 
                message.channel.send(embed);
            }
        }
    }
}