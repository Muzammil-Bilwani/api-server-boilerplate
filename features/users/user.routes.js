const express = require('express');
const router = express.Router();

const catcher = require('../../handlers/err-handlers');
const authCtrl = require('../auth/auth.ctrl');
const userCtrl = require('./user.ctrl');

router.get('/', catcher(authCtrl.verifyUser), catcher(userCtrl.getAllUsers));

router.post('/login', catcher(userCtrl.login));

router.post('/signup', catcher(userCtrl.signUp));

module.exports = router;
