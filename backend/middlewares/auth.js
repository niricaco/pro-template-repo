const auth = (middlewareParams) => (req, res, next) => {
    console.log("authenticating... ");
    const userid = req.header("authorization");
    res.locals.userid = userid;
    if (middlewareParams.block && !res.locals.userid) return res.sendStatus(401);
    next();
};

module.exports = auth;