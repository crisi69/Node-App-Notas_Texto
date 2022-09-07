const getConnection = require('../getConnection');

const insertNoteQuery = async (title, description, idUser) => {
    let connection;

    try {
        connection = await getConnection();

        const createdAt = new Date();

        const [newNote] = await connection.query(
            `INSERT INTO notes (title, description, idUser, createdAt) 
            VALUES (?, ?, ?, ?)`,
            [title, description, idUser, createdAt]
        );

        return {
            id: newNote.insertId,
            idUser,
            description,
            createdAt,
        };
        
    } finally {
        if (connection) connection.release();
    }
};

module.exports = insertNoteQuery;