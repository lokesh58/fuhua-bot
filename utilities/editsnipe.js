const cache = require('@cache/editsnipe-cache')

module.exports = (client) => {
    client.on('messageUpdate', (oldMessage, newMessage) => {
        const {channel, author, content} = oldMessage
        if (author.bot || channel.type === 'dm') return
        cache[channel.id] = {
            user: author.tag,
            content: content
        }
    })
}