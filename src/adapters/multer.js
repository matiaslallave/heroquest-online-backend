import multer from 'multer';

export const BASE_IMG_PATH = '/static/img/';

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'public/img');
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});

export const uploadMiddleware = multer({ storage });