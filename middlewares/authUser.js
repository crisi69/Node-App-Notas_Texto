const jwt = require('jsonwebtoken');

const { generateError } = require('../helpers');

const authUser = async (req, res, next) => {
    try {
        //Obtenemos el token.
        const { authorization } = req.headers;

        if (!authorization) {
            throw generateError('Authorization header is empty', 401);
        }

        // Variable que contiene la información del token.
        let payload;

        try {
            payload = jwt.verify(authorization, process.env.SECRET);
        } catch {
            throw generateError('Wrong token', 401);
        }

        // Agregamos una nueva propiedad al objeto "request" con la info del payload.
        req.user = payload;

        // Pasamos al siguiente controlador.
        next();

    } catch (err) {
        next(err);
        
    }
};

module.exports = authUser;