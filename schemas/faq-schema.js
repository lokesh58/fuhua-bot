const mongoose = require('mongoose');

const faqSchema = mongoose.Schema({
    tags: {
        type: [String],
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('faqs', faqSchema);