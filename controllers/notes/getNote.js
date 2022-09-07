const selectNoteByIdQuery = require('../../db/noteQueries/selectNoteByIdQuery');

const getNote = async (req, res, next) => {
    try {
        const { idNote } = req.params;

        const note = await selectNoteByIdQuery(idNote, req.user?.id);

        res.send({
            status: 'ok',
            data: {
                note,
            },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = getNote;