const getConnection = require('../getConnection');

const updateNoteQuery = async (
    title,
    description,
    category,
    place,
    image,
    idNote
) => {
    let connection;

    try {
        connection = await getConnection();

        await connection.query(
            `UPDATE notes SET title = ?, description = ?, category = ?, place = ?, image = ? WHERE id = ?`,
            [title, description, category, place, image, idNote]
        );
    } finally {
        if (connection) connection.release();
    }
};

module.exports = updateNoteQuery;
