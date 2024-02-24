const express = require("express");
const productRouter = express.Router();
const path = require('path');

const { allProducts, speceficProduct, comparisonProduct, logicProduct, deleteProduct, updateProduct } = require("../controllers/products.controllers");

productRouter.get('/', (req, res) => {
    // res.status(200).send(`<h1 style="text-align:center; margin-top:50px">Welcome to home page</h1>`)
    res.status(200).sendFile(path.join(__dirname, '../views/index.html'));
})

productRouter.get('/products', allProducts);
productRouter.get('/products/:id', speceficProduct);
productRouter.get('/productscompare', comparisonProduct);
productRouter.get('/productsLogic', logicProduct);
productRouter.delete('/productDelete/:id', deleteProduct);
productRouter.put('/updateProduct/:id', updateProduct);

productRouter.get('*',(req, res) => {
    res.status(404).sendFile(path.join(__dirname, '../views/404.html'));
});

module.exports = productRouter;