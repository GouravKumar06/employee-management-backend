const Employee = require('../model/employee');
const path = require('path');
const bcrypt = require('bcrypt');


exports.add_employee = async (req, res) => {
    try{
        const {firstName, lastName, email, password, salary, address, category} = req.body;

        if(!firstName || !lastName || !email || !password || !salary || !address || !category){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const filename = req.file.filename
        const fileUrl = path.join(filename)

        const hashedPassword = await bcrypt.hash(password, 10);

        const employee = await Employee.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPassword,
            salary: salary,
            address: address,
            category: category,
            image:fileUrl
        })

        return res.status(200).json({
            success: true,
            message: "Employee added successfully",
            employee
        })

    }
    catch{
        console.log(error)
        return res.status(500).json({
           success: false,
           message: "Error in adding employee"
       })    
    }  
}

exports.get_employee = async (req, res) => {
    try{
        const employee = await Employee.find();
        return res.status(200).json({
            success: true,
            employee
        })
    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Error in getting employee"
        })
    }
}


exports.get_employee_id = async (req, res) => {
    try{
        const employee = await Employee.findById(req.params.id);
        return res.status(200).json({
            success: true,
            employee
        })
    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Error in getting employee on the basis of id"
        })
    }
}


exports.edit_employee = async (req, res) => {
    try{
        const {firstName, lastName, email, salary, address, selectCategory} = req.body;
        const employee = await Employee.findByIdAndUpdate(req.params.id, {
            firstName,
            lastName,
            email,
            salary,
            address,
            category:selectCategory
        },{new: true})
        return res.status(200).json({
            success: true,
            message: "Employee updated successfully",
            employee
        })
    }
    catch(error)
    {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Error in updating employee"
        })
    }
}


exports.delete_employee = async (req, res) => {
    try{
        const employee = await Employee.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            success: true,
            message: "Employee deleted successfully",
            employee
        })
    }
    catch(error)
    {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Error in deleting employee"
        })
    }
}