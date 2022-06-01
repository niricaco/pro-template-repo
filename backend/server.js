require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');
const config = process.env;

mongoose.connect(config.CONNECTION_STRING);

app.listen(config.PORT, () => {
    console.log(`Listening at localhost:${config.PORT}...`)
});