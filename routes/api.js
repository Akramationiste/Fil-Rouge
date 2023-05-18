const express = require('express');
const router = express.Router();

const client = require('./client');
const proprietaire = require('./proprietaire');
const admin = require('./admin');

router.use('/client', client);
router.use('/proprietaire', proprietaire);
router.use('/admin', admin);

module.exports = router;