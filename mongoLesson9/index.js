const { app, hostName, chalk } = require('./app');
const config=require("./config/config");
const PORT=config.app.port;

app.listen(PORT, hostName, () => {
    console.log(chalk.bgRed.bold(`Server is running at http://${hostName}:${PORT}`));
})