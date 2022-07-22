import Product from "../model/product";

export const createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.json({
    product,
  });
};

export const getAllProduct = async (req, res) => {
  const product = await Product.find();
  res.json({
    product,
  });
};

export const updateProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body);
  res.json({
    product,
  });
};

export const deleteProduct = async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  res.json({
    product,
  });
};
