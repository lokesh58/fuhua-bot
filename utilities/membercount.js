module.exports = async (client) => {
    const channelID = '804902447193391136';
    
    const updateMembers = (guild) => {
        const channel = guild.channels.cache.get(channelID);
        channel.setName(`Members: ${guild.memberCount.toLocaleString()}`);
    };

    client.on('guildMemberAdd', member => {updateMembers(member.guild)});
    client.on('guildMemberRemove', member => {updateMembers(member.guild)});

    const guildID = '787501525228453888';
    const guild = client.guilds.cache.get(guildID);
    updateMembers(guild);
};