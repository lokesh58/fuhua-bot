const cache = require('@cache/editsnipe-cache')

module.exports = (client) => {
    client.on('messageUpdate', (oldMessage, newMessage) => {
        const {channel, author, content} = oldMessage
        if (author.bot) return
        cache[channel.id] = {
            user: author.tag,
            content: content
        }
    })
}