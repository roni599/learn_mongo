const express = require('express');
const app = express();
const chalk = require('chalk');
const mongoose = require('mongoose');
const PORT = 3000;
const hostName = `127.0.0.1`;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send(`<h1 style="text-align:center;margin-top:50px">Welcome to home page</h1>`)
})

// mongoose.connect('mongodb://127.0.0.1:27017/usersBD')
// .then(()=>{
//     console.log(chalk.bgGreen.bold(`db is connected`))
// })
// .catch((error)=>{
//     console.log(chalk.bgRed.bold(`db is not connected`));
//     console.log(error);
//     process.exit(1);
// })

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    ratting:{
        type:Number,
        required:true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const product = mongoose.model('product', productSchema);

app.post('/products', async (req, res) => {
    try {
        const { title, description, price } = req.body;
        const newProduct = new product({
            title,
            description,
            price
        })
        const productData = await newProduct.save();
        res.status(201).send(productData);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }

})

const connectdb = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/productsDB');
        console.log(chalk.bgGreen.bold(`db is connected`))
    } catch (error) {
        console.log(chalk.bgRed.bold(`db is not connected`));
        console.log(error.message);
        process.exit(1);
    }
}

app.listen(PORT, hostName, () => {
    console.log(chalk.blue.bgRed.bold(`Server is running at http://${hostName}:${PORT}`));
    connectdb();
})