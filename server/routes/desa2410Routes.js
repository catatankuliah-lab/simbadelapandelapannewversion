const express = require("express");
const router = express.Router();
const desaController = require("../controllers/desa2410Controller");

router.get("/:id", desaController.getAllDesaByIdKecamatan);

module.exports = router;
