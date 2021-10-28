const mongoose = require('mongoose');
const MovieSchema = mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    year: {
        type: Number,
    },
    genre: {
        type: String
    },
    actor: {
        type: String,
    },
})

module.exports = mongoose.model('Movie', MovieSchema)