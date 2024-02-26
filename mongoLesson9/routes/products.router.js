const express = require("express");
const productRouter = express.Router();

const { allProducts, speceficProduct, comparisonProduct, logicProduct, deleteProduct, updateProduct, productsCreate } = require("../controllers/products.controllers");

productRouter.get('/products', allProducts);
productRouter.post('/products', productsCreate)
productRouter.get('/products/:id', speceficProduct);
productRouter.get('/productscompare', comparisonProduct);
productRouter.get('/productsLogic', logicProduct);
productRouter.delete('/productDelete/:id', deleteProduct);
productRouter.put('/updateProduct/:id', updateProduct);

module.exports = productRouter;