const selectNoteByIdQuery = require('../../db/noteQueries/selectNoteByIdQuery');
const udpateNoteQuery = require('../../db/noteQueries/updateNoteQuery');

const { generateError } = require('../../helpers');

const editNote = async (req, res, next) => {
    try {
        const {idNote} = req.params
        
        // Obtenemos los campos del body.
        let { title, description, category } = req.body;

        // Si faltan todos los campos, lanzamos un error.
         if (!title && !description && !category) {
             throw generateError('Empty fields', 400);
        }

        // Obtenemos la info de la nota.
        const note = await selectNoteByIdQuery(idNote);


        title = title || note.title;
        description = description || note.description;
        category = category || note.category;
            
        // Actualizamos los datos del usuario.
        await udpateNoteQuery(title, description, category, idNote)

        res.send({
            status: 'ok',
            message: 'Updated note',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = editNote;
