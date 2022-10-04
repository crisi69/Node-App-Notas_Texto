const insertNoteQuery = require('../../db/noteQueries/insertNoteQuery');

const { generateError, savePhoto } = require('../../helpers');

const newNote = async (req, res, next) => {
    try {
        const { title, description, category } = req.body;

        if (!title || !description || !category) {
            throw generateError('Empty fields', 400);
        }

        let image;
        if (req.files?.image) {
            image = await savePhoto(req.files.image);
        }
        const idNote = await insertNoteQuery(
            title,
            description,
            category,
            image,
            req.user.id
        );

        res.send({
            status: 'ok',
            data: {
                id: idNote,
                title,
                description,
                category,
                image,
                idUser: req.user.id,
                createdAt: new Date(),
            },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = newNote;
