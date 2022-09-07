const insertUserQuery = require('../../db/UserQueries/insertUserQuery');
const { generateError } = require('../../helpers');

const newUser = async (req, res, next) => {
    try {
        // Obtenemos los campos del body.
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            throw generateError('Faltan campos', 400)
        }

        await insertUserQuery(username, email, password);

        res.send({
            status: 'ok',
            message: 'User created',
        });

    } catch (err) {
        next(err);
    }
};

module.exports = newUser;