const getConnection = require('../getConnection');

const updateNoteQuery = async (title, description, category, idNote) => {
    let connection;

    try {
        connection = await getConnection();

        await connection.query(
            `UPDATE notes SET title = ?, description = ?, category = ? WHERE id = ?`,
            [title, description, category, idNote]
        );
    } finally {
        if (connection) connection.release();
    }
};

module.exports = updateNoteQuery;