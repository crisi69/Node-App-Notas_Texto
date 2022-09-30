const selectAllNotesQuery = require('../../db/noteQueries/selectAllNotesQuery');

const listAllNotes = async (req, res, next) => {
    try {
        const notes = await selectAllNotesQuery();

        res.send({
            status: 'ok',
            data: notes,
        });
    } catch (err) {
        next(err);
    }
};

module.exports = listAllNotes;
