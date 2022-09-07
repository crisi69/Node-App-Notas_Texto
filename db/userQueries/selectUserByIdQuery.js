const getConnection = require('../getConnection');

const { generateError } = require('../../helpers');

const selectUserByIdQuery = async (idUser) => {
    let connection;

    try {
        connection = await getConnection();

        const [users] = await connection.query(
            `SELECT id, username, email, role, createdAt, 
            FROM users WHERE id = ?`,
            [idUser]
        );

    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectUserByIdQuery;