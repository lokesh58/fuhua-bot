const mongo = require('@utils/mongo')
const cache = require('@cache/reaction-cache')
const rxnSchema = require('@schemas/reaction-schema')

const findRxn = (msg) => {
    for(let i=0; i<cache.length; ++i){
        if(cache[i].msg === msg){
            return cache[i].rxn
        }
    }
    return null
}

module.exports = async (client) => {
    await mongo().then(async (mongoose) => {
        try{
            const rxns = await rxnSchema.find({})
            for (const rxn of rxns){
                cache.push({
                    id: rxn._id,
                    msg: rxn.msg,
                    rxn: rxn.rxn
                })
            }
        }finally{
            mongoose.connection.close()
        }
    }).catch(console.error)

    client.on('message', (message) => {
        const rxn = findRxn(message.content.toLowerCase())
        if(rxn){
            message.channel.send(rxn)
        }
    })
}