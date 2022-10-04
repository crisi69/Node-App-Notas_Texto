const getConnection = require('../getConnection');

const { generateError } = require('../../helpers');

const selectAllNotesQuery = async () => {
    let connection;

    try {
        connection = await getConnection();

        let [notes] = await connection.query(
            `
                SELECT id, 
                    idUser,
                    title,
                    category,
                    description,
                    image,
                    createdAt
                FROM notes
                ORDER by createdAt DESC
                
                
            `
        );

        if (notes.length < 1) {
            throw generateError('It does not exists any note', 404);
        }
        return notes;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectAllNotesQuery;
