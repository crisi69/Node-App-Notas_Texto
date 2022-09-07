const getConnection = require('../getConnection');
const bcrypt = require('bcrypt');
const { generateError } = require('../../helpers');

const insertUserQuery = async (username, email, password) => {
    let connection;

    try {
        connection = await getConnection();

        const [users] = await connection.query(
            `SELECT id FROM users WHERE username = ? OR email = ?`,
            [username, email]
        );

        if (users.length > 0) {
            throw generateError('It already exists an user with this username or email', 403);
        }

        // Encriptamos la contraseña.
        const hashedPassword = await bcrypt.hash(password, 10);

        // Creamos el usuario.
        await connection.query(`
                INSERT INTO users (username, email, password, createdAt)
                VALUES (?, ?, ?, ?)
                `,
                [username, email, hashedPassword, new Date()]
             );


    } finally {
        if (connection) connection.release();
    }
};

module.exports = insertUserQuery;