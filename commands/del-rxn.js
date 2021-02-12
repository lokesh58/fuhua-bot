const cache = require('@cache/reaction-cache')
const mongo = require('@utils/mongo')
const rxnSchema = require('@schemas/reaction-schema')

const deleteRxn = async (id) => {
    await mongo().then(async (mongoose) => {
        try{
            await rxnSchema.deleteOne({
                _id: cache[id].id
            })
            cache.splice(id, 1)
        }finally{
            mongoose.connection.close()
        }
    })
}

module.exports = {
    name: 'del-rxn',
    description: 'Removes custom reaction to messages',
    format: `${process.env.PREFIX}del-rxn <reaction id>`,
    async execute(message, args){
        if(!message.member.hasPermission('ADMINISTRATOR')){
            return message.reply('you don\'t have the permission to use this command')
        }
        if(args.length === 0){
            return message.reply('please specify the ID of custom reaction to delete')
        }
        if(isNaN(args[0])){
            return message.reply('the id must be a number')
        }
        const id=+args[0]-1;
        if(id>=0 && id<cache.length){
            await deleteRxn(id);
            message.channel.send('Custom Reaction was successfully deleted');
        }else{
            return message.reply(`Custom reaction with ID ${id+1} doesn't exist`);
        }
    }
}