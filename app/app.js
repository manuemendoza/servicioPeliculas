const express = require('express');

const app = express();

app.use(express.json());

app.listen(4025, () => console.log('Servidor levantado en 4025'));