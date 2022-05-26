const router = require('express').Router();

router.post('/api/login', (req, res) => {
    /*
        receive Google code => get Googletoken => get userId
        userID exists ? send jwt token : create user and send jwt token
    */
})