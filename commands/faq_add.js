const cache = require('@cache/faq-cache.js');
const mongo = require('@utils/mongo.js');
const faqSchema = require('@schemas/faq-schema.js');

const checkExistence = (newTag) => {
    for(const id=0; id<cache.length; ++id){
        for(const tag of cache[id].tags){
            if(tag.includes(newTag) || newTag.includes(tag)){
                return true;
            }
        }
    }
    return false;
}

const addFAQ = async (tags, description) => {
    await mongo().then(async (mongoose) => {
        try{
            await new faqSchema({
                tags: tags,
                description: description
            }).save().then(faq => {
                cache.push({
                    id: faq._id,
                    tags: faq.tags,
                    description: faq.description
                });
            });
        }finally{
            mongoose.connection.close();
        }
    }).catch(console.error);
}

module.exports = {
    name: 'faq_add',
    description: 'Add an FAQ',
    format: '!faq_add -tag <tag> ... -desc <description>',
    async execute(message, args){
        if(!message.member.hasPermission('MANAGE_MESSAGES')){
            return message.reply('you don\'t have the permission to use this command');
        }
        const tags = [];
        let description = '';
        //Parse the command to get tags and description
        for(let i=0; i<args.length; ++i){
            if(args[i] === '-tag'){
                let j=i+1;
                let tag = '';
                while(j<args.length && !args[j].startsWith('-')){
                    if(tag.length > 0) tag += ' ';
                    tag += args[j++];
                }
                tags.push(tag);
                i=j-1;
            } else if (args[i] === '-desc'){
                let j=i+1;
                while(j<args.length && !args[j].startsWith('-')){
                    if(description.length > 0) description += ' ';
                    description += args[j++];
                }
                i=j-1;
            }
        }

        //Check if a faq with similar tag exists
        let similar_exists = false;
        for(const tag of tags){
            similar_exists = similar_exists || checkExistence(tag);
        }
        if(similar_exists){
            return message.reply('a FAQ with similar tag already exists, please change the tags');
        }
        await addFAQ(tags, description);
        message.channel.send('FAQ was successfully added');
    }
}