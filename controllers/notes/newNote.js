const insertNoteQuery = require('../../db/noteQueries/insertNoteQuery');

const { generateError } = require('../../helpers');

const newNote = async (req, res, next) => {
    try {
        const { title, description } = req.body;

        if (!title || !description) {
            throw generateError('Empty fields', 400);
        }

        const idNote = await insertNoteQuery(
            title,
            description,
            req.user.id
        );

        res.send({
            status: 'ok',
            data: {
                note: {
                    id: idNote,
                    title,
                    description,
                    idUser: req.user.id,
                    createdAt: new Date(),
                },
            },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = newNote;