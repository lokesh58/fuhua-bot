const mongoose = require('mongoose');

const reqString = {
    type: String,
    required: true
};

const faqSchema = mongoose.Schema({
    name: reqString,
    description: reqString
});

module.exports = mongoose.model('faqs', faqSchema);