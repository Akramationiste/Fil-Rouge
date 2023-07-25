const express = require('express');
const router = express.Router();


const admin = require('./admin');
const utilisateur = require('./utilisateur');
const authentification = require('./authr');


router.use('/utilisateur', utilisateur);
router.use('/admin', admin);
router.use('/authr', authentification)

module.exports = router;