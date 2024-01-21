const express = require("express");
const app = express();
require("dotenv").config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const admin = require("./routes/admin.js");
const category = require("./routes/category.js");
const employee = require("./routes/employee.js");


const connectDatabase = require("./database/db");

const port = process.env.PORT || 7000;

app.use("/",express.static("uploads"));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin:"http://localhost:3001",
    credentials:true
}));

app.use("/api/v1/admin",admin);
app.use("/api/v1/category",category);
app.use("/api/v1/employee",employee)

connectDatabase();
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})