const router = require('express').Router();

const controller = require('./controller.js');

router.get('/:id', controller.getMovie);
router.get('/', controller.getMovies);
router.post('/', controller.createMovie);
router.put('/:id', controller.updateMovie);
router.delete('/:id', controller.deleteMovie);

module.exports = router;