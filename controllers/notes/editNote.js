const selectNoteByIdQuery = require('../../db/noteQueries/selectNoteByIdQuery');
const udpateNoteQuery = require('../../db/noteQueries/updateNoteQuery');

const { generateError, deletePhoto, savePhoto } = require('../../helpers');

const editNote = async (req, res, next) => {
    try {
        const { idNote } = req.params;

        // Obtenemos los campos del body.
        let { title, description, category, place } = req.body;

        // Si faltan todos los campos, lanzamos un error.
        if (!title && !description && !category) {
            throw generateError('Empty fields', 400);
        }

        // Obtenemos la info de la nota.
        const note = await selectNoteByIdQuery(idNote);

        let image = note.image;

        if (req.files?.image) {
            if (note.image) await deletePhoto(note.image);
            image = await savePhoto(req.files.image);
        }

        // Actualizamos los datos del usuario.
        await udpateNoteQuery(
            title,
            description,
            category,
            place,
            image,
            idNote
        );

        res.send({
            status: 'ok',
            message: 'Updated note',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = editNote;
