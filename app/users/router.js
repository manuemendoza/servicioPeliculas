const router = require('express').Router();

const controller = require('./controller.js');

router.get('/:id', controller);
router.get('/:id', controller);
router.post('/:id', controller);
router.delete('/:id', controller);


module.exports = router;