const express = require("express");
const router = express.Router();
const dttRoutes = require("../controllers/dttController");

router.post("/add", dttRoutes.addDTT);
router.get("/all", dttRoutes.getAllDTT);
router.get("/detail/:id", dttRoutes.getDetailDTT);
router.get("/details/:id", dttRoutes.getDetailsDTT);

module.exports = router;
