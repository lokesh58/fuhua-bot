module.exports = client => {
    client.on('guildMemberAdd', member => {
        const welcomeChannelID = '790503598928560128';
        const welcomeChannel = member.guild.channels.cache.get(welcomeChannelID);

        const rulesChannelID = '801755778338783242';
        const rulesChannel = member.guild.channels.cache.get(rulesChannelID);

        const {guild} = member;
        const valkRole = guild.roles.cache.find(role => role.name === 'Valkyrija');
        const botRole = guild.roles.cache.find(role => role.name === 'Bot');
        if(member.user.bot){
            member.roles.add(botRole);
        }else{
            member.roles.add(valkRole);
            const message = `Welcome <@${member.id}> to St. Freya High. Please check out ${rulesChannel.toString()}`;
            welcomeChannel.send(message);
        }
    })
}