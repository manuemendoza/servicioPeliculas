const router = require('express').Router();

const controller = require('./controller.js');

router.get('/:id', controller.getMovie);
router.get('/:id', controller.getMovies);
router.get('/:id', controller.postMovie);
router.get('/:id', controller.putMovie);
router.get('/:id', controller.deleteMovie);

module.exports = router