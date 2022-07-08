
const Category = require('../model/category')

exports.createCategory = async(req,res)=>{
    const category = await Category.create(req.body);
    return res.json({
        category
    })
}
exports.getAllCategory = async(req, res, next) => {
    const category = await Category.find();
    return res.json({
        category
    })
}