require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');


const moviesRouter = require("./movies/router.js");
const usersRouter = require("./users/router.js");
const authMiddleWare = require("./auth.js");

mongoose.connect(process.env.DB_HOST, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Conectado a la base datos'))
    .catch(err => console.error('algo ha salido mal, no estamos conectados', err));

const app = express();

app.use(express.json());

app.use('/movies', moviesRouter);
app.use('/users', usersRouter);


// a little easter egg :P
app.get('/coffee', (req, res) => res.send('So sorry', 418));

app.listen(process.env.PORT, () => console.log('Servidor levantado en ', process.env.PORT));