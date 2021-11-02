const express = require('express');
const Movie = require('./model.js')

const getMovie = async(req, res) => {
    try {
        const movie = await Movie.findById(req.params.id)
        if (movie) {
            res.json(movie);
        } else {
            res.json({
                message: "movie not found"
            }, 404);
        }
    } catch (error) {
        console.error(error);
        res.json({
            message: error.message
        }, 500);
    }
};

const getMovies = async(req, res) => {
    let filter = {};
    if (req.query.title) {
        filter.title = { $regex: new RegExp(req.query.title, 'i') };
    }
    if (req.query.genres) {
        filter.genres = { $regex: new RegExp(req.query.genres, 'i') };
    }
    if (req.query.actors) {
        filter.actors = { $regex: new RegExp(req.query.actors, 'i') };
    }
    try {
        const movies = await Movie.find(filter);
        res.json({ movies });
    } catch (error) {
        console.error(error);
        res.json({
            message: error.message
        }, 500);
    }
};

const createMovie = async(req, res) => {
    const movie = new Movie(req.body);
    try {
        await movie.save();
        res.json(movie);
    } catch (error) {
        console.error(error);
        if (error.name == "ValidationError") {
            res.json({
                menssage: error.message
            }, 400);
        } else {
            res.json({
                message: error.message
            }, 500);
        }
    }
};

const updateMovie = async(req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (movie) {
            const movieUpdate = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.json(movieUpdate);
        } else {
            res.json({
                message: "movie not found"
            }, 404);
        }
    } catch (error) {
        // @TODO: validate ¬¬
        res.json({
            message: error.message
        }, 500);
    }
};

const deleteMovie = async(req, res) => {
    try {
        const movie = await Movie.findById(req.params.id)
        if (movie) {
            const movie = await Movie.findByIdAndDelete(req.params.id);
            res.json({
                message: 'movie deleted'
            });
        } else {
            res.json({
                message: "movie not found"
            }, 404);
        }
    } catch (error) {
        // @TODO: validate ¬¬
        res.json({
            message: error.message
        }, 500);
    }
};

module.exports = {
    getMovie,
    getMovies,
    createMovie,
    updateMovie,
    deleteMovie
};