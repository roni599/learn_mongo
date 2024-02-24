const { app, PORT, hostName, connectdb, chalk } = require('./app');

app.listen(PORT, hostName, () => {
    console.log(chalk.bgRed.bold(`Server is running at http://${hostName}:${PORT}`));
    connectdb();
})