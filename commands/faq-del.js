const cache = require('@cache/faq-cache.js');
const mongo = require('@utils/mongo.js');
const faqSchema = require('@schemas/faq-schema.js');

const deleteFAQ = async (id) => {
    const faqID = cache[id].id;
    await mongo().then(async (mongoose) => {
        await faqSchema.deleteOne({
            _id: faqID
        });
        cache.splice(id, 1);
    });
}

module.exports = {
    name: 'faq-del',
    description: 'delete an FAQ',
    format: `${process.env.PREFIX}faq-del <faq id>`,
    async execute(message, args){
        if(!message.member.hasPermission('MANAGE_MESSAGES')){
            return message.reply('you don\'t have the permission to use this command');
        }
        if(args.length === 0){
            return message.reply('please specify the id of faq to delete');
        }
        if(isNaN(args[0])){
            return message.reply('the id must be a number');
        }
        const id=+args[0]-1;
        if(id>=0 && id<cache.length){
            await deleteFAQ(id);
            message.channel.send('FAQ was successfully deleted');
        }else{
            return message.reply(`FAQ with ID ${id+1} doesn't exist`);
        }
    }
}