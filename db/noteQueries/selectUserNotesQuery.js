const getConnection = require('../getConnection');

const { generateError } = require('../../helpers');

const selectUserNotesQuery = async (idUser) => {
    let connection;

    try {
        connection = await getConnection();

        let [notes] = await connection.query(
            `
                SELECT id, 
                    title,
                    category,
                    description,
                    image,
                    createdAt 
                FROM notes
                WHERE idUser LIKE ?
                ORDER by createdAt DESC
            `,
            [idUser]
        );

        if (notes.length < 1) {
            throw generateError('It does not exists any note', 404);
        }
        return notes;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectUserNotesQuery;
