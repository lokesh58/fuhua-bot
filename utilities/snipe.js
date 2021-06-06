const cache = require('@cache/snipe-cache')

module.exports = (client) => {
    client.on('messageDelete', message => {
        const {channel, author, content} = message
        if (author.bot || channel.type === 'dm') return
        cache[channel.id] = {
            user: author.tag,
            content: content
        }
    })
}