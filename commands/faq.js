const mongo = require('@utils/mongo.js');
const faqSchema = require('@schemas/faq-schema.js');

const {MessageEmbed} = require('discord.js');

const cache = require('@cache/faq-cache.js');

const findByTag = (tag) => {
    for(let id = 0; id < cache.length; ++id){
        for(const _tag of cache[id].tags){
            if(_tag.includes(tag)){
                return cache[id].description;
            }
        }
    }
    return null;
}

module.exports = {
    name: 'faq',
    description: 'Quickly send an faq in chat',
    format: '!faq <faq id/tag>',
    execute(message, args){
        if(!message.member.hasPermission('MANAGE_MESSAGES')){
            return message.reply('you don\'t have the permission to use this command');
        }
        if(args.length === 0){
            let list = '';
            if(cache.length === 0){
                list = 'No FAQ added';
            }else{
                for(let id=0; id<cache.length; ++id){
                    if(id>0)list+='\n';
                    list += `• \`${id+1}.\` ${cache[id].tags.join(", ")}`;
                }
            }
            const embed = new MessageEmbed()
                                .setTitle('List of FAQ')
                                .setDescription(list)
                                .setColor('#c60a0a');
            return message.channel.send(embed);
        }
        let faq = null;
        if(isNaN(args[0])){
            const tag = args.join(' ').toLowerCase();
            faq = findByTag(tag);
        }else{
            const id = +args[0]-1;
            if(id >= 0 && id < cache.length){
                faq = cache[id].description;
            }
        }
        if(!faq){
            message.channel.send(`FAQ was not found`);
        }else{
            message.channel.send(faq);
        }
    }
}