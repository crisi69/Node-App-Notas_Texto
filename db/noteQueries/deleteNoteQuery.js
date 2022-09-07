const getConnection = require ('../getConnection');

const deleteNoteQuery = async (idNote) => {

    let connection;

    try {
        connection = await getConnection();

        await connection.query(`
            DELETE FROM notes WHERE id = ?`,
            [idNote]
        );

    } finally {
        if(connection) connection.release();
    }
};

module.exports = deleteNoteQuery;