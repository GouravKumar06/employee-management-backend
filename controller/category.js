const Category = require('../model/category');


exports.add_category = async (req, res) => {
    try{
        const {category} = req.body;

        if(!category){
            return res.status(400).json({
                success: false,
                message: "category is required"
            });
        }

        let newCategory = await Category.findOne({category});
        if(newCategory){
            return res.status(400).json({
                success: false,
                message: "category already exist"
            });
        }else{
            newCategory = await Category.create({
                category
            })
        }

        return res.status(200).json({
            success: true,
            newCategory
        });
    }
    catch(error)
    {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "error in add category"
        });   
    }
}


exports.get_category = async (req, res) => {
    try{
        const category = await Category.find();
        return res.status(200).json({
            success: true,
            category
        });
    }
    catch(error)
    {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "error in get category"
        });   
    }
}