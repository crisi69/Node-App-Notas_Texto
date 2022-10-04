const fs = require('fs/promises');
const path = require('path');
const sharp = require('sharp');
const { v4: uuid } = require('uuid');

/**
 * ####################
 * ## Generate Error ##
 * ####################
 */

const generateError = (message, status) => {
    const err = new Error(message);
    err.statusCode = status;
    return err;
};

// SAVE PHOTO //

const savePhoto = async (img) => {
    const uploadsPath = path.join(__dirname, process.env.UPLOADS_DIR);
    try {
        await fs.access(uploadsPath);
    } catch {
        await fs.mkdir(uploadsPath);
    }
    const sharpImg = sharp(img.data);

    sharpImg.resize(500);

    const image = `${uuid(24)}.jpg`;

    const imgPath = path.join(uploadsPath, image);

    await sharpImg.toFile(imgPath);

    return image;
};
// DELETE PHOTO//

const deletePhoto = async (imgName) => {
    try {
        const imgPath = path.join(__dirname, process.env.UPLOADS_DIR, imgName);
        await fs.unlink(imgPath);
    } catch {
        throw generateError('Error deleting photo');
    }
};

module.exports = { generateError, savePhoto, deletePhoto };
