require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');
const { logger } = require("./middlewares/logger");
const auth = require("./middlewares/auth");
const errorhandler = require("./middlewares/errorhandler");
const dashboardRoutes = require('./route/dashboard.js');

const app = express();
const config = process.env;

app.use(cors({
    origin: config.APP_URL
}));

app.use(express.json());

app.use([
    logger, auth
]);

app.use('/api/dashboards', dashboardRoutes);

app.get('/api/public', (req, res) => {
    console.log("public");
    res.send("Hello world public");
});

app.get('/api/private', auth({ block: true }), (req, res) => {
    if (!res.locals.userid) return res.sendStatus(401);
    console.log("private");
    res.send(`Hello world private ${res.locals.userid} `);
});

app.get('/api/both', auth({ block: false }), (req, res) => {
    console.log("both");
    if (!res.locals.userid) res.send("Hello world public");
    res.send(`Hello world public and also private ${res.locals.userid} `);
});

app.use(errorhandler);

mongoose.connect(config.CONNECTION_STRING, () => {
    console.log("MongoDB connected using Mongoose.");

    app.listen(config.PORT, () => {
        console.log(`Listening at localhost:${config.PORT}...`)
    });
}, e => console.error(e));