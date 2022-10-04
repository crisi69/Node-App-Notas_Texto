const getConnection = require('../getConnection');

const insertNoteQuery = async (title, description, category, image, idUser) => {
    let connection;

    try {
        connection = await getConnection();

        const createdAt = new Date();

        const [newNote] = await connection.query(
            `INSERT INTO notes (title, description, category, image, idUser, createdAt) 
            VALUES (?, ?, ?, ?, ?, ?)`,
            [title, description, category, image, idUser, createdAt]
        );

        return {
            id: newNote.insertId,
            idUser,
            title,
            description,
            category,
            image,
            createdAt,
        };
    } finally {
        if (connection) connection.release();
    }
};

module.exports = insertNoteQuery;
