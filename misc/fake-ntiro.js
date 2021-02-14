module.exports = async (message) => {
    let resend = false;
    const args = message.content.split(' ');
    const newMsg = [];
    for(const word of args){
        if(word.startsWith(':') && word.endsWith(':')){
            const name = word.slice(1,-1).toLowerCase();
            const emote = message.client.emojis.cache.find(emoji => emoji.name.toLowerCase() === name);
            if(emote){
                newMsg.push(`${emote}`);
                resend = true;
            }else{
                newMsg.push(word);
            }
        }else{
            newMsg.push(word);
        }
    }
    if(resend){
        message.delete();
        const fakeUser = await message.channel.createWebhook(message.member.displayName, {
            avatar: message.author.displayAvatarURL()
        })
        fakeUser.send(newMsg.join(' ')).then(message =>{
            fakeUser.delete()
        });
    }
}