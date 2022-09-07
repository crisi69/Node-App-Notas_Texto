const getConnection = require('../getConnection');

const { generateError } = require('../../helpers');

const insertCategoryQuery = async (title, idUser, idEntry) => {
    let connection;

    try {
        connection = await getConnection();

        const [categories] = await connection.query(
            `SELECT id FROM categories WHERE idUser = ? AND idEntry = ?`,
            [idUser, idEntry]
        );

        if (categories.length > 0) {
            throw generateError('You already categorized this note', 403);
        }

        // const validCategories = [Recetas, Viajes, Restaurantes, Hoteles, Campings];

        if (!categories.includes(title)) {
            throw generateError(
                'Wrong category',
                403
            );
        }

        await connection.query(
            `INSERT INTO categories (value, idUser, idEntry, createdAt) VALUES (?, ?, ?, ?)`,
            [title, idUser, idEntry, new Date()]
        );
    } finally {
        if (connection) connection.release();
    }
};

module.exports = insertCategoryQuery;

// Sabemos que no funciona pero no sabemos muy bien el motivo.
