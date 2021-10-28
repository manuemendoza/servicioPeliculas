const express = require('express');
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/servicioPelicula', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Conectado a la base datos'))
    .catch(err => console.error('algo ha salido mal, no estamos conectados', err));


const app = express();
const routerMovies = require("./movies/router.js");

app.use(express.json());
app.use('/movies', routerMovies);

app.listen(4025, () => console.log('Servidor levantado en 4025'));