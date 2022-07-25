const Category = require("../model/category");

export const createCategory = async (req, res) => {
  const category = await Category.create(req.body);
  return res.json({
    category,
  });
};

export const getAllCategory = async (req, res, next) => {
  const category = await Category.find();
  return res.json({
    category,
  });
};
