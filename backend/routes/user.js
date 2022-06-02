const router = require('express').Router();
const httpModule = require('../utils/http');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const http = httpModule();

const config = {
    google: {
        client_id: process.env.CLIENT_ID_GOOGLE,
        client_secret: process.env.CLIENT_SECRET_GOOGLE,
        redirect_uri: "http://localhost:3000/callback",
        token_endpoint: "https://oauth2.googleapis.com/token"
    },

    github: {
        client_id: process.env.CLIENT_ID_GITHUB, //appid?
        client_secret: process.env.CLIENT_SECRET_GITHUB,
        redirect_uri: "http://localhost:3000/callback/github",
        token_endpoint: "https://github.com/login/oauth/access_token"

    }

}

router.post('/login', async(req, res) => {

    const payload = req.body;
    console.log(req.body);

    if (!payload) return res.sendStatus(400);

    const code = payload.code;
    const provider = payload.provider;

    if (!code || !provider) return res.sendStatus(400);

    if (!Object.keys(config).includes(provider)) return res.sendStatus(400);

    const response = await http.post(config[provider].token_endpoint, {
        "code": code,
        "client_id": config[provider].client_id,
        "client_secret": config[provider].client_secret,
        "redirect_uri": config[provider].redirect_uri,
        "grant_type": "authorization_code",
        "scope": "openid"
    });

    if (!response) res.sendStatus(500);
    if (response.status !== 200) return res.sendStatus(401);

    const decoded = jwt.decode(response.data.id_token);
    if (!decoded) return res.sendStatus(500);
    console.log(decoded);

    const key = "providers." + provider;
    let user = await User.findOneAndUpdate({
        [key]: decoded.sub
    }, {
        "providers": {
            [provider]: decoded.sub
        },
    }, {
        upsert: true,
        new: true
    }, );

    const token = jwt.sign({ "userId": user._id, "providers": user.providers },
        process.env.JWT_SECRET, { expiresIn: "1h" }
    )

    res.json({ token });

    /*
        receive Google code => get Googletoken => get userId
        userID exists ? send jwt token : create user and send jwt token
    */

});

module.exports = router;