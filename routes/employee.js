const express = require("express");
const { add_employee, get_employee, get_employee_id, edit_employee, delete_employee } = require("../controller/employee");
const { upload } = require("../multer");
const router = express.Router();

router.post("/add_employee",upload.single("image") ,add_employee);
router.get("/get_employee",get_employee);
router.get("/get_employee/:id",get_employee_id);
router.put("/edit_employee/:id",edit_employee)
router.delete("/delete_employee/:id",delete_employee)



module.exports = router;
