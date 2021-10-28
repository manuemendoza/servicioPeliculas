const Movie = require('./model.js')

const getMovies = async(req, res) => {
    if (req.query.title) {
        const movies = await Movie.find({ title: req.query.title });
        res.json({
            movies: movies
        });
    } else {
        res.json({
            movies: await Movie.find()
        });
    }
};

const getMovie = async(req, res) => res.json({
    movie: await Movie.findById(req.params.id)
});

const createMovie = async(req, res) => {
    const movie = new Movie(req.body);
    try {
        await movie.save();
        res.json(movie);
    } catch (error) {
        res.json(err => console.error('No se ha guardado en la base de dato', err))
    }

};

const updateMovie = async(req, res) => {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body);
    res.json({
        movie: await Movie.findById(req.params.id)
    });
};

const deleteMovie = async(req, res) => {
    const movie = await Movie.findByIdAndDelete(req.params.id)
    res.json({
        delete: movie
    });
};

module.exports = {
    getMovie,
    getMovies,
    createMovie,
    updateMovie,
    deleteMovie
};