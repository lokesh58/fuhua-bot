const cache = require('@cache/reaction-cache')
const mongo = require('@utils/mongo')
const rxnSchema = require('@schemas/reaction-schema')

const addRxn = async (msg, rxn) => {
    await mongo().then(async (mongoose) => {
        try{
            await new rxnSchema({
                msg: msg,
                rxn: rxn
            }).save().then(customRxn => {
                cache.push({
                    id: customRxn._id,
                    msg: customRxn.msg,
                    rxn: customRxn.rxn
                })
            })
        }finally{
            mongoose.connection.close()
        }
    }).catch(console.error)
}

module.exports = {
    name: 'add-rxn',
    description: 'Adds custom reaction to messages',
    format:`${process.env.PREFIX}add-rxn -msg <message> -rxn <reaction>`,
    async execute(message, args){
        if(!message.member.hasPermission('ADMINISTRATOR')){
            return message.reply('you don\'t have the permission to use this command')
        }

        let msg = ''
        let rxn = ''
        for(let i=0; i<args.length; ++i){
            if(args[i].toLowerCase() === '-msg'){
                let j=i+1
                while (j<args.length && args[j].toLowerCase() !== '-msg' && args[j].toLowerCase() !== '-rxn'){
                    if(msg.length > 0) msg += ' '
                    msg += args[j++]
                }
                i = j-1
            } else if(args[i].toLowerCase() === '-rxn'){
                let j=i+1
                while (j<args.length && args[j].toLowerCase() !== '-msg' && args[j].toLowerCase() !== '-rxn'){
                    if(rxn.length > 0) rxn += ' '
                    rxn += args[j++]
                }
                i = j-1
            }
        }
        
        for(let i=0; i<cache.length; ++i){
            if(cache[i].msg === msg){
                return message.reply('reaction for that message already exists!')
            }
        }

        await addRxn(msg, rxn)
        message.channel.send('Custom Reaction added successfully')
    }
}