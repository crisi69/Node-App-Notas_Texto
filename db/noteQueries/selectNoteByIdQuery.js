const getConnection = require('../getConnection');

const { generateError } = require('../../helpers');

const selectNoteByIdQuery = async(idNote) => {
    let connection;

    try {
        connection = await getConnection();
    
        let [notes] = await connection.query (
            `
                SELECT N.id, 
                    N.idUser,
                    N.title,
                    N.description,
                    N.createdAt
                FROM notes N
                LEFT JOIN users U ON N.idUser = U.id
                WHERE N.id LIKE ?

            `, 
            [idNote]
        );
    
        if (notes.length < 1) {
            throw generateError('It does not exists any notes', 404);
        }

        return notes[0];
    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectNoteByIdQuery;