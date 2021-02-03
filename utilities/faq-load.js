const cache = require('@cache/faq-cache.js');
const mongo = require('@utils/mongo.js');
const faqSchema = require('@schemas/faq-schema.js');

module.exports = async () => {
    await mongo().then(async (mongoose) => {
        try{
            const faqs = await faqSchema.find({});
            for(const faq of faqs){
                cache.push({id: faq._id,
                            tags: faq.tags,
                            description: faq.description});
            }
        } finally {
            mongoose.connection.close();
        }
    }).catch(console.error);
}