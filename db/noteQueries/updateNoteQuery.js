const getConnection = require('../getConnection');

const updateNoteQuery = async (title, description, idNote) => {
    let connection;

    try {
        connection = await getConnection();

        await connection.query(
            `UPDATE notes SET title = ?, description = ? WHERE id = ?`,
            [title, description, idNote]
        );
    } finally {
        if (connection) connection.release();
    }
};

module.exports = updateNoteQuery;