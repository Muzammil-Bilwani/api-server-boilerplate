const express = require('express');

const router = express.Router();

const catcher = require('../../handlers/err-handlers');
const authCtrl = require('../auth/auth.ctrl');
const initiateCtrl = require('./controller/user.initiate');
const userCrud = require('./controller/user.crud');

router.get('/', catcher(authCtrl.verifyUser), catcher(userCrud.getAllUsers));

router.post('/login', catcher(initiateCtrl.login));

router.post('/signup', catcher(initiateCtrl.signUp));

router.get('/me', catcher(authCtrl.verifyUser), catcher(authCtrl.unseal), catcher(initiateCtrl.verifyMe));

module.exports = router;
