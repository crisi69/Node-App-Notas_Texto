const selectUserNotesQuery = require('../../db/noteQueries/selectUserNotesQuery');

const listNotes = async (req, res, next) => {
    try {
        const notes = await selectUserNotesQuery(req.user.id);

        res.send({
            status: 'ok',
            data: notes,
        });
    } catch (err) {
        next(err);
    }
};

module.exports = listNotes;