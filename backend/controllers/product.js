const Product = require('../model/product')

exports.createProduct = async(req,res) =>{
    const product = await Product.create(req.body);
    res.json({
        product
    })
}

exports.getAllProduct = async(req,res) =>{
    const product = await Product.find();
    res.json({
        product
    })
}

exports.updateProduct = async(req,res) =>{
    const product = await Product.findByIdAndUpdate(req.params.id,req.body);
    res.json({
        product
    })
}

exports.deleteProduct = async(req,res) =>{
    const product = await Product.findByIdAndDelete(req.params.id);
    res.json({
        product
    })
}