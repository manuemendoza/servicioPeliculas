const router = require('express').Router();

const controller = require('./controller.js');
const auth = require('../auth.js');

router.get('/:id', auth.checkUser, controller.getUser);
router.get('/', auth.checkUser, controller.getUsers);
router.post('/', controller.createUser);
router.post('/login', controller.loginUser);
router.put('/:id', auth.checkAdminOrOwn, controller.updateUser);
router.delete('/:id', auth.checkAdminOrOwn, controller.deleteUser);


module.exports = router;