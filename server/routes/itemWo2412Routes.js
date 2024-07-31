const express = require('express');
const router = express.Router();
const itemWoController = require('../controllers/itemWo2412Controller');

router.post('/add', itemWoController.addItemWo);

router.get('/all', itemWoController.getAllItemWo);

module.exports = router;
