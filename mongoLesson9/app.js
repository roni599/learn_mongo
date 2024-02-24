const express = require('express');
const app = express();
const PORT = 3000;
const hostName = `127.0.0.1`;
const chalk = require('chalk');
const mongoose = require('mongoose');
const productRouter = require('./routes/products.router');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(productRouter);

const connectdb = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/productsDB')
        console.log(chalk.bgGreen.bold(`db is connected`));
    } catch (error) {
        console.log(chalk.bgGreen.bold(`db is no connected`));
        console.log(error.message);
        process.exit(1);
    }
}

module.exports = {
    app,
    PORT,
    hostName,
    connectdb,
    chalk
}