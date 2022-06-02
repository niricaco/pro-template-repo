require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');
const config = process.env;

mongoose.connect(config.CONNECTION_STRING).then(() => console.log("MongoDB connected"));

app.listen(config.PORT, () => {
    console.log(`Listening at localhost:${config.PORT}...`)
});