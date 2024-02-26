const express = require('express');
const app = express();
const hostName = `127.0.0.1`;
const chalk = require('chalk');
require('./config/db')

const cors = require('cors');
const productRouter = require('./routes/products.router');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cors())
app.use(productRouter);

app.get('/', (req, res) => {
    // res.status(200).send(`<h1 style="text-align:center; margin-top:50px">Welcome to home page</h1>`)
    res.status(200).sendFile(__dirname + '/views/index.html');
})
app.use((req, res, next) => {
    res.status(404).sendFile(__dirname + '/views/404.html');
});

app.use((err, req, res, next) => {
    res.status(500).json({
        message: "something broke"
    });
});



module.exports = {
    app,
    hostName,
    chalk
}