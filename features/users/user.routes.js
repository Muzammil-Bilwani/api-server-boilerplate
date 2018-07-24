const express = require('express');

const router = express.Router();

const catcher = require('../../handlers/err-handlers');
const authCtrl = require('./controllers/auth.ctrl');
const crudCtrl = require('./controllers/crud.ctrl');

router.get('/', catcher(authCtrl.verifyUser), catcher(crudCtrl.getUsers));

router.post('/login', catcher(authCtrl.login));

router.post('/signup', catcher(authCtrl.signUp));

module.exports = router;
