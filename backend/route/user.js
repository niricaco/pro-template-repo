const router = require('express').Router();
const httpModule = require('../utils/http');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const http = httpModule();

const config = {
    google: {
        client_id: "",
        client_secret: "",
        redirect_uri: "",
        tokend_endpoint: ""
    },
    /*
    facebook: {
        client_id: "", //appid?
        client_secret: "", //appsecret ?
        redirect_uri: "",
        tokend_endpoint: ""

    }
    */
}

router.post('/api/login', (req, res) => {

    const payload = req.body;
    if (!payload) return res.sendStatus(400);

    const code = payload.code;
    const provider = payload.provider;

    if (!code || !provider) return res.sendStatus(400);

    if (!Object.keys(config).includes(provider)) return res.sendStatus(400);

    const response = await http.post(config[provider].tokend_endpoint, {
        "code": code,
        "client_id": config[provider].client_id,
        "client_secret": config[provider].client_secret,
        "redirect_uri": config[provider].redirect_uri,
        "grant_type": "authorization_code"
    });

    if (!response) res.sendStatus(500);
    if (response.status !== 200) return res.sendStatus(401);

    const decoded = jwt.decode(response.data.id_token);
    if (!decoded) return res.sendStatus(500);

    const key = "providers." + provider;
    const user = await User.find({
        [key]: decoded.sub
    });

    /*
        receive Google code => get Googletoken => get userId
        userID exists ? send jwt token : create user and send jwt token
    */

});

module.exports = router;