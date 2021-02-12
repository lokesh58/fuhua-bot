const mongoose = require('mongoose')

const reactionSchema = mongoose.Schema({
    msg: {
        type: String,
        required: true
    },
    rxn: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('reactions', reactionSchema)