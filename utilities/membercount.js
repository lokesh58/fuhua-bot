module.exports = async (client) => {
    const channelID = '804902447193391136';
    const guildID = '787501525228453888';
    
    const updateMembers = (guild) => {
        if(guild.id != guildID) return;
        const channel = guild.channels.cache.get(channelID);
        channel.setName(`Members: ${guild.memberCount.toLocaleString()}`);
    };

    client.on('guildMemberAdd', member => {updateMembers(member.guild)});
    client.on('guildMemberRemove', member => {updateMembers(member.guild)});

    const guild = client.guilds.cache.get(guildID);
    updateMembers(guild);
};