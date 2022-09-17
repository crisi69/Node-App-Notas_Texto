const jwt = require('jsonwebtoken');

const { generateError } = require('../helpers');

const authUser = async (req, res, next) => {
    try {
        const { authorization } = req.headers;

        if (authorization) {

            let payload;

            try {
            payload = jwt.verify(authorization, process.env.SECRET);
            } catch {
            throw generateError('Wrong token', 401);
            }

            req.user = payload;
        }
        next();
    } catch (err) {
        next(err);
    }
};

module.exports = authUser;