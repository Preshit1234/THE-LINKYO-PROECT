const jwt = require("jsonwebtoken");

function verify(req, res, next) {
    const authHeader = req.headers.token;
    let error;
    if (authHeader) {
        const token = authHeader.split(" ")[1];

        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if (err) {
                res.status(403).json({
                    message: "Token is not valid",
                    error: err,
                });
                error = err;
                return;
            }
            req.user = user;
            next();
        });
    } else {
        return res
            .status(401)
            .json({ message: "you are not authenticated", error: error });
        return;
    }
}

module.exports = verify;
