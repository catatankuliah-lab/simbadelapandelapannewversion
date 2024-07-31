const express = require('express');
const router = express.Router();
const woController = require('../controllers/woController');

// Rute untuk menambahkan WO
router.post('/add', woController.addWo);

// Rute untuk mendapatkan semua WO
router.get('/all', woController.getAllWo);

// Rute untuk mendapatkan detail WO berdasarkan ID
router.get('/detail/:id', woController.getDetailWO);

// Rute untuk mendapatkan detail lengkap WO berdasarkan ID
router.get('/details/:id', woController.getDetailsWO);

// Rute untuk memperbarui WO berdasarkan ID
router.put('/update/:id', woController.updateWO);

module.exports = router;
