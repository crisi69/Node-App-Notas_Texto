const getConnection = require('../getConnection');

const generateError = require('../../helpers');

const selectUserByIdQuery = async (idUser) => {
    let connection;

    try {
        connection = await getConnection();

        const [users] = await connection.query(
            `SELECT * FROM users WHERE id = ?`,
            [idUser]
        );

        if (users.length < 1) {
            throw generateError('username not found', 404);
        }
        return users[0];
    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectUserByIdQuery;