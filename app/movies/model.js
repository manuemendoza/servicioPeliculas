const mongoose = require('mongoose');
const MovieSchema = mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    year: {
        type: Number,
        require: true
    },
    genre: {
        type: String,
        require: true
    },
    actor: {
        type: String,
        require:true
    },
})

module.exports = mongoose.model('Movie', MovieSchema)