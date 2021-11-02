const router = require('express').Router();

const controller = require('./controller.js');
const auth = require('../auth.js');

router.get('/:id', auth.checkUser, controller.getMovie);
router.get('/', auth.checkUser, controller.getMovies);
router.post('/', auth.checkAdminOrOwn, controller.createMovie);
router.put('/:id', auth.checkAdminOrOwn, controller.updateMovie);
router.delete('/:id', auth.checkAdminOrOwn, controller.deleteMovie);



module.exports = router;