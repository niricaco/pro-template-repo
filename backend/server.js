require('dotenv').config();
const express = require('express')
const cors = require('cors');

const app = express();
const config = process.env;

const corsOptions = {
    origin: config.APP_URL,
    optionsSuccessStatus: 200
}

const logger = (req, res, next) => {
    console.log("logging... ");
    next();
}

const auth = (req, res, next) => {
    console.log("authenticating... ");
    const userid = 1;
    res.locals.userid = userid;
    next();
}

const businessLogic = (req, res) => {
    if (!req.userid) return res.sendStatus(401);

    console.log("business logic running...")
    console.log(req.locals.userid);
    res.status(200).json("siker");
}

app.use(logger);
app.use(auth);
app.use(businessLogic);

/*
app.use(cors(corsOptions));
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello world");
});
*/

app.listen(config.PORT, () => {
    console.log(`Listening at localhost:${config.PORT}...`)
});