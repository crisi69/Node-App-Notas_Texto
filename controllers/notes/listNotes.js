const selectAllNotesQuery = require('../../db/noteQueries/selectAllNotesQuery');

const listNotes = async (req, res, next) => {
    try {
        const { keyword } = req.query;

        const notes = await selectAllNotesQuery(req.user?.id, keyword);

        res.send({
            status: 'ok',
            data: {
                notes,
            },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = listNotes;