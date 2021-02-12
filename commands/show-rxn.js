const cache = require('@cache/reaction-cache')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'show-rxn',
    description: 'Shows all the custom reactions',
    format: `${process.env.PREFIX}show-rxn`,
    execute(message, args){
        let list = '';
        if(cache.length === 0){
            list = 'No Custom Reactions added';
        }else{
            for(let id=0; id<cache.length; ++id){
                if(id>0)list+='\n';
                list += `• \`${id+1}.\` ${cache[id].msg}`;
            }
        }
        const embed = new MessageEmbed()
                        .setTitle('List of Custom Reactions')
                        .setDescription(list)
                        .setColor('#c60a0a')
        message.channel.send(embed)
    }
}