module.exports = (client) => {
    client.on('guildMemberAdd', member => {
        const {guild} = member;
        if(guild.id != '787501525228453888') return;
        const valkRole = guild.roles.cache.find(role => role.name === 'Valkyrija');
        const botRole = guild.roles.cache.find(role => role.name === 'Bot');
        if(member.user.bot){
            member.roles.add(botRole);
        }else{
            member.roles.add(valkRole);
        }
    })
}