const jwt = require("jsonwebtoken");

function verifyMember(req, res, next) {
    const headers = req.headers;
    let errors;

    if (!headers) {
        res.status(401).json("Invalid request");
        return;
    }

    if (!headers.token || !headers.membertoken) {
        res.status(401).json("Unauthorized");
        return;
    }

    const accessToken = headers.token.split(" ")[1];
    const memberAccessToken = headers.membertoken.split(" ")[1];

    jwt.verify(accessToken, process.env.SECRET_KEY, (err, user) => {
        if (err) {
            if (err.name === "TokenExpiredError") {
                res.status(403).json("Member token expired");
                errors = true;
                return;
            }
            res.status(403).json("Invalid user token");
            errors = true;
            return;
        }
        req.user = user;
    });

    jwt.verify(memberAccessToken, process.env.SECRET_KEY, (err, member) => {
        if (err) {
            if (err.name === "TokenExpiredError") {
                res.status(403).json("Member token expired");
                errors = true;
                return;
            }
            res.status(403).json("Invalid member token");
            errors = true;
            return;
        }
        req.member = member;
    });

    if (errors) return;

    if (req.user.id !== req.member.userId) {
        res.status(401).json("Tokens not matching");
        return;
    }

    next();
}

module.exports = verifyMember;
