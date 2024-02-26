const mongoose = require('mongoose');
const chalk = require('chalk');
const config = require('./config');

const DBURL = config.db.url;

const connectdb = async () => {
    try {
        await mongoose.connect(DBURL)
        console.log(chalk.bgGreen.bold(`mongodb atlas is connected`));
    } catch (error) {
        console.log(chalk.bgGreen.bold(`mongodb atlas is not connected`));
        console.log(error.message);
        process.exit(1);
    }
}

connectdb();
