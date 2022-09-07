const bcrypt = require('bcrypt');
const selectUserByEmailQuery = require('../../db/UserQueries/selectUserByEmailQuery');
const jwt = require('jsonwebtoken');

const { generateError } = require('../../helpers');

const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw generateError('Faltan campos', 400);
        }

        // Obtenemos el usuario con el email que viene en el body.
        const user = await selectUserByEmailQuery(email);

        // Comprobamos si las contraseñas coinciden.
        const validPassword = await bcrypt.compare(password, user.password);

        // Si no coinciden, lanzamos un error.
        if (!validPassword) {
            throw generateError('Wrong password', 401);
        }

        // Creamos un objeto con la información que queremos meter en el token.
        const payload = {
            id: user.id,
            role: user.role,
        };

        // Creamos el token.
        const token = jwt.sign(payload, process.env.SECRET, {
            expiresIn: '10d',
        });

        res.send({
            status: 'ok',
            data:{ 
                token, 
            },
        });

    } catch (err) {
        next(err);
    }
};

module.exports = loginUser;