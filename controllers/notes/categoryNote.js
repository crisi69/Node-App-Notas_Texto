const selectNoteByIdQuery = require('../../db/noteQueries/selectNoteByIdQuery');
const insertCategoryQuery = require('../../db/noteQueries/insertCategoryQuery');

const { generateError } = require('../../helpers');

const categoryNote = async (req, res, next) => {
    try {
        const { idEntry } = req.params;

        const { value } = req.body;

        await insertCategoryQuery(value, req.user.id, idEntry);

        res.send({
            status: 'ok',
            message: 'Categoriced successfully',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = categoryNote;

// Sabemos que no funciona pero no sabemos muy bien el motivo.