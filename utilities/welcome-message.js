module.exports = client => {
    client.on('guildMemberAdd', member => {
        const {guild} = member

        const welcomeChannelID = '790503598928560128';
        const welcomeChannel = guild.channels.cache.get(welcomeChannelID);

        const annoucementChannelID = '802927957160230942'
        const annoucementChannel = guild.channels.cache.get(annoucementChannelID);

        const rulesChannelID = '801755778338783242';
        const rulesChannel = guild.channels.cache.get(rulesChannelID);

        if(member.user.bot){
            annoucementChannel.send(`${member.displayName} has been added to the server!`)
        }else{
            const message = `Welcome <@${member.id}> to St. Freya High. Please check out ${rulesChannel.toString()}`;
            welcomeChannel.send(message);
        }
    })
}