const express = require("express");
const router = express.Router();
const masterdatakpmController = require("../controllers/masterdatakpmController");

// Route untuk menambahkan mobil baru
router.post("/add", masterdatakpmController.addMasterDataKpm);

// Route untuk membaca semua data mobil
router.get("/all", masterdatakpmController.getAllDataMasterKpm);

module.exports = router;
