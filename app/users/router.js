const router = require('express').Router();

const controller = require('./controller.js');

router.get('/:id', controller.getUser);
router.get('/', controller.getUsers);
router.post('/', controller.createUser);
router.delete('/:id', controller.deleteUser);


module.exports = router;