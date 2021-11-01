const mongoose = require('mongoose');
const MovieSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    genres: [{
        type: String,
        required: true
    }],
    actors: [{
        type: String,
        required: true
    }],
})

module.exports = mongoose.model('Movie', MovieSchema)