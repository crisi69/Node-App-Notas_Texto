const deleteNoteQuery =require('../../db/noteQueries/deleteNoteQuery');
const selectNoteByIdQuery = require('../../db/noteQueries/selectNoteByIdQuery');

const { generateError } = require('../../helpers');

const deleteNote = async (req, res, next) => {

    try {
        const { idNote } = req.params;

        const note = await selectNoteByIdQuery(idNote);


        if (note.idUser !== req.user?.id) {
            throw generateError('You need some permissions', 401);
        }

        await deleteNoteQuery(idNote);

        res.send({
            status: 'ok',
            message: 'Deleted note',
        });

    } catch (err) {
        next(err);
    }
};

module.exports = deleteNote;