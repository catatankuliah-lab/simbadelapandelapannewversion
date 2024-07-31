const express = require('express');
const router = express.Router();
const woController = require('../controllers/wo2408Controller');

router.post('/add', woController.addWo);
router.get('/all', woController.getAllWo);
router.get('/details/:id', woController.getDetailsWO);
router.put('/update/:id', woController.updateWO);
router.delete('/delete/:id', woController.deleteWO);

module.exports = router;
