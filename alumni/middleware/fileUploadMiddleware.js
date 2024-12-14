/*
File upload Middleware: Handles file uploads for the SLU Alumni website
Saves uploaded files to the server with unique filenames, enforces size limits, and validates file types
- Storage Configuration: Saves files to the 'alumni/uploads' directory
- Filename Generation: Appends a unique timestamp and random number to the original filename
- File Size Limit: Restricts uploads to 16 MB
- File Type Validation: Allows only JPEG, PNG, GIF images, and MP4, MKV video files
Reference: (https://blog.logrocket.com/multer-nodejs-express-upload-file/) 
Group Member Responsible:  Caparas, Joaquin Gabriel
*/

import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = 'alumni/uploads';
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${uniqueSuffix}-${file.originalname}`);
    }
});

const fileUploadMiddleware = multer({
    storage,
    limits: { fileSize: 16 * 1024 * 1024 }, // 16 MB
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'video/mkv'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Unsupported file type'));
        }
    }
});

export default fileUploadMiddleware;
