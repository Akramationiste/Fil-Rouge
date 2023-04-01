const express = require('express');
const router = express.Router();

const client = require('./client');
const proprietaire = require('./proprietaire');

router.use('/client', client);
router.use('/proprietaire', proprietaire);

module.exports = router;