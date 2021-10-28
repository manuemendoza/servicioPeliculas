const Movie = require('./model.js');
// const filtraPeliculas = (laBusqueda) =>
//     peliculas.filter((filtrado) =>
//         filtrado.toLocaleLowerCase().includes(laBusqueda.toLocaleLowerCase()) == true);

// module.exports.getMovies = (req, res) => {
//     if (req.query.title) {
//         res.json({ movie: filtraPeliculas(req.query.title) });
//     } else {
//         res.json({
//             movie: peliculas
//         });
//     }
// };
// module.exports.getMovie = (req, res) => res.json({
//     movie: peliculas[req.params.id]
// });

// module.exports.postMovie = (req, res) => {
//     const pelicula = (req.body.movie);
//     peliculas.push(pelicula);
//     res.json({
//         movie: peliculas
//     });
// };

// module.exports.putMovies = (req, res) => {
//     const palabra = (req.body.movie);
//     const posicion = peliculas.indexOf(palabra);
//     peliculas[posicion] = (req.body.new);
//     res.json({
//         newFilm: peliculas
//     });
// };