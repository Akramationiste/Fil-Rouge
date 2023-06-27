const express = require('express');
const controller = require('../controllers/utilisateur');
const authRouter = express.Router();
// const auth = require('../middlewares/authm');


authRouter.post('/register', controller.register);
authRouter.post('/login', controller.login);


module.exports = authRouter;