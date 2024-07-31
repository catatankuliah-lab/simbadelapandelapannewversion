const express = require("express");
const router = express.Router();
const desaController = require("../controllers/desa2408Controller");

router.get("/:id", desaController.getAllDesaByIdKecamatan);

module.exports = router;
