const {MessageEmbed} = require('discord.js');

module.exports = {
    name: 'reactionrole',
    description: 'Sets up the reaction role message',
    async execute(message, args){
        const channel = '802928508875046943';
        const glbRole = message.guild.roles.cache.find(role => role.name === 'global');
        const seaRole = message.guild.roles.cache.find(role => role.name === 'SEA');

        const glbEmoji = '🟦';
        const seaEmoji = '🟨';

        let embed = new MessageEmbed()
                    .setColor('#e42643')
                    .setTitle('Choose your HI3 server!')
                    .setDescription('Having the correct role, you\'ll be notified about new exchange codes.\n\n'
                                    +`${glbEmoji} for global\n`
                                    +`${seaEmoji} for SEA`);
        
        let messageEmbed = await message.channel.send(embed);
        messageEmbed.react(glbEmoji);
        messageEmbed.react(seaEmoji);

        message.client.on('messageReactionAdd', async(reaction, user)=>{
            if(reaction.message.partial) await reaction.message.fetch();
            if(reaction.partial) await reaction.fetch();
            if(user.bot) return;
            if(!reaction.message.guild) return;
            if(reaction.message.channel.id == channel){
                if(reaction.emoji.name === glbEmoji){
                    await reaction.message.guild.members.cache.get(user.id).roles.add(glbRole);
                }
                if(reaction.emoji.name === seaEmoji){
                    await reaction.message.guild.members.cache.get(user.id).roles.add(seaRole);
                }
            }else{
                return;
            }
        });

        message.client.on('messageReactionRemove', async(reaction, user)=>{
            if(reaction.message.partial) await reaction.message.fetch();
            if(reaction.partial) await reaction.fetch();
            if(user.bot) return;
            if(!reaction.message.guild) return;
            if(reaction.message.channel.id == channel){
                if(reaction.emoji.name === glbEmoji){
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(glbRole);
                }
                if(reaction.emoji.name === seaEmoji){
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(seaRole);
                }
            }else{
                return;
            }
        });
    }
}