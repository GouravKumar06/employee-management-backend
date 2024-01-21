const express = require("express");
const { signup, login, get_admin, logout } = require("../controller/admin");
const router = express.Router();

router.post("/signup",signup);
router.post("/login",login);
router.get("/get_admin",get_admin);
router.get("/logout",logout)



module.exports = router;