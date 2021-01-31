const mongoose = require('mongoose');

const mongoPath = `mongodb+srv://fuhua:${process.env.DB_PASS}@faq.nhcks.mongodb.net/faqs?retryWrites=true&w=majority`;

module.exports = async() => {
    await mongoose.connect(mongoPath, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });
    return mongoose;
}