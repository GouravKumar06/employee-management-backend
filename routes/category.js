const express = require("express");
const { add_category, get_category } = require("../controller/category");
const router = express.Router();

router.post("/add_category",add_category)
router.get("/get_category",get_category)


module.exports = router