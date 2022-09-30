const insertNoteQuery = require('../../db/noteQueries/insertNoteQuery');

const { generateError } = require('../../helpers');

const newNote = async (req, res, next) => {
    try {
        const { title, description, category } = req.body;

        if (!title || !description || !category) {
            throw generateError('Empty fields', 400);
        }

        const idNote = await insertNoteQuery(
            title,
            description,
            category,
            req.user.id
        );

        res.send({
            status: 'ok',
            data: {
                
                id: idNote,
                title,
                description,
                category,
                idUser: req.user.id,
                createdAt: new Date(),
                
            },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = newNote;