const insertUserQuery = require('../../db/UserQueries/insertUserQuery');
const { generateError } = require('../../helpers');

const newUser = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
       
        if (!username || !email || !password) {
            throw generateError(`Missing fields: ${username} ${email} ${password}`, 400)
        }

        await insertUserQuery(username, email, password);

        res.send({
            status: 'ok',
            message: 'User created',
            data: {
                idUser: req.user?.id,
            },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = newUser;