const mongoose = require('mongoose');

const UsersSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    surname: {
        type: String,
        require: true
    },
    password: {
        type: String,
        min: 8,
        max: 20,
        require: true,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        require: true,
        match: /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,

    }
});

module.exports = mongoose.model('User', UsersSchema);