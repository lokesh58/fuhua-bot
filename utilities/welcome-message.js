module.exports = client => {
    client.on('guildMemberAdd', member => {
        const welcomeChannelID = '790503598928560128';
        const welcomeChannel = member.guild.channels.cache.get(welcomeChannelID);

        const rulesChannelID = '801755778338783242';
        const rulesChannel = member.guild.channels.cache.get(rulesChannelID);

        const message = `Welcome <@${member.id}> to St. Freya High. Please check out ${rulesChannel.toString()}`;
        welcomeChannel.send(message);
    })
}