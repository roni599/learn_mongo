const { v4: uuidv4 } = require('uuid');
const product = require('../models/products.model');

const allProducts = async (req, res) => {
    try {
        const allProduct = await product.find();
        if (allProduct) {
            res.status(200).send({
                success: true,
                message: 'get all product',
                data: allProduct
            })
        }
        else {
            res.status(404).send({
                success: false,
                message: 'product not found'
            })
        }
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

const productsCreate = async (req, res) => {
    try {
        const newProduct = new product({
            id: uuidv4(),
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            ratting: req.body.ratting
        })
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const speceficProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const singleProduct = await product.findOne({ _id: id });
        if (singleProduct) {
            res.status(200).send({
                success: true,
                message: "return single product",
                data: singleProduct
            })
        }
        else {
            res.status(404).send({
                success: false,
                message: "product not found"
            })
        }
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
}

//$lt,$gt,$ne,$eq,$nin,$in,$gte,$lte
const comparisonProduct = async (req, res) => {
    try {
        const price = parseInt(req.query.price);
        let productCompare = await product.findOne({ price: price })
        if (price) {
            // productCompare = await product.find({ price: { $gt: 4, $lt: 20 } });
            productCompare = await product.findOne({ price: price })
        }
        else {
            productCompare = await product.find()
        }
        if (productCompare) {
            res.status(200).send({
                success: true,
                message: "return single product",
                data: productCompare
            })
        }
        else {
            res.status(404).send({
                success: false,
                message: "product not found"
            })
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
}

// $and,$or,$nor,$not
//countDocuments()
//sort()
//select()
const logicProduct = async (req, res) => {
    try {
        let price = parseFloat(req.query.price);
        let ratting = parseFloat(req.query.ratting);
        let productLogic;
        if (price && ratting) {
            // productLogic=await product.find({$and:[{price:{$gt:price}},{ratting:{$eq:ratting}}]});
            productLogic = await product.find({ $or: [{ price: { $lt: price } }, { ratting: { $gt: ratting } }] }).sort({ price: -1 }).select({ price: 1, _id: 0 });
        }
        else {
            productLogic = await product.find().sort({ price: -1 });
        }
        if (productLogic) {
            res.status(200).send({
                success: true,
                message: 'return logic products',
                data: productLogic
            })
        }
        else {
            res.status(404).send({
                success: false,
                message: "products not found"
            })
        }
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const deleteProduct = req.params.id;
        let deleteItem;
        if (deleteProduct) {
            deleteItem = await product.findOneAndDelete({ _id: deleteProduct });
        }
        else {
            deleteItem = await product.find();
        }
        if (deleteItem) {
            res.status(200).send({
                success: true,
                message: "selected product item is deleted successfully",
                data: deleteItem
            })
        }
        else {
            res.status(404).send({
                success: false,
                message: "selected item is not deleted"
            })
        }
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
}

const updateProduct = async (req, res) => {
    try {
        const updated_id = req.params.id;
        let updatedProduct;
        if (updated_id) {
            updatedProduct = await product.findByIdAndUpdate(
                { _id: updated_id },
                {
                    $set: {
                        title: req.body.title,
                        price: req.body.price,
                        description: req.body.description,
                        ratting: req.body.ratting
                    }
                },
                { new: true }
            );
        }
        else {
            updatedProduct = await product.find();
        }
        if (updatedProduct) {
            res.status(200).send({
                success: true,
                message: "update successfully",
                data: updatedProduct
            })
        }
        else {
            res.status(404).send({
                success: false,
                message: "update is not successfully"
            })
        }
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
}
module.exports = {
    allProducts,
    productsCreate,
    speceficProduct,
    comparisonProduct,
    logicProduct,
    deleteProduct,
    updateProduct
}