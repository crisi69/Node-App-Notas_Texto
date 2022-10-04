const getConnection = require('../getConnection');

const updateNoteQuery = async (title, description, category, image, idNote) => {
    let connection;

    try {
        connection = await getConnection();

        await connection.query(
            `UPDATE notes SET title = ?, description = ?, category = ? WHERE id = ?`,
            [title, description, category, image, idNote]
        );
    } finally {
        if (connection) connection.release();
    }
};

module.exports = updateNoteQuery;
