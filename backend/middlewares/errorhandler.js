const errorhandler = (err, req, res, next) => {
    console.log(err);
    res.status(500).json("middleware-nél error");
}

module.exports = errorhandler;