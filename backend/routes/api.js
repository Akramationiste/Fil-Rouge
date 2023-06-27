const express = require('express');
const router = express.Router();

// const client = require('./client');
// const proprietaire = require('./proprietaire');
const admin = require('./admin');
const utilisateur = require('./utilisateur');
const authentification = require('./authr');

// router.use('/client', client);
// router.use('/proprietaire', proprietaire);
router.use('/utilisateur', utilisateur);
router.use('/admin', admin);
router.use('/authr', authentification)

module.exports = router;