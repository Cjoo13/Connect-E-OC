const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/', userCtrl.getAllAccounts);
router.get('/:id', auth, userCtrl.getOneAccount);
router.patch('/:id', auth, userCtrl.modifyAccount);
router.post('/untrash/:id', auth, userCtrl.restoreAccount);
router.delete('/trash/:id', auth, userCtrl.deleteInTrash);
router.delete('/:id', auth, userCtrl.deleteAccount);

module.exports = router;