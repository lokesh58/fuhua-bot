const {MessageEmbed} = require('discord.js');

const addReactions = (message, reactions) => {
    message.react(reactions[0]);
    reactions.shift();
    if(reactions.length === 0) return;
    setTimeout(()=>{
        addReactions(message, reactions);
    }, 750);
}

module.exports = async (client) => {
    const glbEmoji = '🟦';
    const seaEmoji = '🟨';
    const reactions = [glbEmoji, seaEmoji];
    
    const channelID = '802928508875046943';
    const channel = await client.channels.fetch(channelID);
    
    channel.messages.fetch().then((messages) => {
        if(messages.size === 0){
            let embed = new MessageEmbed()
                    .setColor('#c60a0a')
                    .setTitle('Choose your HI3 server!')
                    .setDescription('Having the correct role, you\'ll be notified about new exchange codes.\n\n'
                                    +`${glbEmoji} for global\n`
                                    +`${seaEmoji} for SEA`);
            channel.send(embed).then(message => {
                addReactions(message, reactions);
            });
        }
    });

    client.on('messageReactionAdd', async(reaction, user)=>{
        if(reaction.message.partial) await reaction.message.fetch();
        if(reaction.partial) await reaction.fetch();
        if(user.bot) return;
        if(!reaction.message.guild) return;
        if(reaction.message.channel.id == channelID){
            if(reaction.emoji.name === glbEmoji){
                const glbRole = reaction.message.guild.roles.cache.find(role => role.name === 'global');
                await reaction.message.guild.members.cache.get(user.id).roles.add(glbRole);
            }
            if(reaction.emoji.name === seaEmoji){
                const seaRole = reaction.message.guild.roles.cache.find(role => role.name === 'SEA');
                await reaction.message.guild.members.cache.get(user.id).roles.add(seaRole);
            }
        }else{
            return;
        }
    });

    client.on('messageReactionRemove', async(reaction, user)=>{
        if(reaction.message.partial) await reaction.message.fetch();
        if(reaction.partial) await reaction.fetch();
        if(user.bot) return;
        if(!reaction.message.guild) return;
        if(reaction.message.channel.id == channelID){
            if(reaction.emoji.name === glbEmoji){
                const glbRole = reaction.message.guild.roles.cache.find(role => role.name === 'global');
                await reaction.message.guild.members.cache.get(user.id).roles.remove(glbRole);
            }
            if(reaction.emoji.name === seaEmoji){
                const seaRole = reaction.message.guild.roles.cache.find(role => role.name === 'SEA');
                await reaction.message.guild.members.cache.get(user.id).roles.remove(seaRole);
            }
        }else{
            return;
        }
    });
}