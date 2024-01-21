const Admin = require('../model/admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config();

exports.signup = async (req, res) => {
    try{
        const {name, email, password} = req.body;
        if(!name || !email || !password){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        let admin = await Admin.findOne({email});
        if(admin){
            return res.status(400).json({
                success: false,
                message: "Admin already exist please login"
            });
        }
        else{
            const hashedPassword = await bcrypt.hash(password, 10);
            admin = await Admin.create({
                name,
                email,
                password: hashedPassword
            });
        }
        res.status(201).json({
            success: true, 
            admin
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "error in sign up"
        });
    }
}

exports.login = async (req, res) => {
    try{
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        let admin = await Admin.findOne({email}).select("+password");
        if(!admin){
            return res.status(400).json({
                success: false,
                message: "Admin not found please sign up first"
            });
        }

        const isMatch = await bcrypt.compare(password, admin.password);

        if(!isMatch){
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const admin_token = jwt.sign({id: admin._id}, process.env.JWT_SECRET, {
            expiresIn:"5d" 
        });

        //cookies creation
        const options = {
            expires: new Date(Date.now() + 5* 24 * 60 * 60 * 1000),
            httpOnly: true
        }

        res.status(200).cookie("admin_token", admin_token, options).json({
            success: true,
            admin,
            admin_token
        })

        
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "error in login"
        });
    }
}


exports.get_admin = async (req, res) => {
    try{
        const admin = await Admin.find();
        res.status(200).json({
            success: true,
            admin
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "error in getting admin"
        });
    }
}


exports.logout = async (req, res) => {
    try{
        return res.status(200).clearCookie("admin_token").json({
            success: true,
            message: "Logged out"
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "error in logout"
        });
    }
}