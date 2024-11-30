import express from 'express';
import multer from 'multer';
import { getAlumni, handleLogout, handleUserPost, getPost } from '../controller/alumniController.js';

const router = express.Router();


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = './uploads';
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${uniqueSuffix}-${file.originalname}`);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 16 * 1024 * 1024 }, // 16mb
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'video/mkv'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Unsupported file type'));
        }
    }
});


router.get('/homefeed', getAlumni); // Get start-up info
router.get('/logout', handleLogout); // Log out
router.post('/postfeed', upload.fields([
    { name: 'images[]', maxCount: 5 }, 
    { name: 'videos[]', maxCount: 2 }   
]), handleUserPost);
router.get('/getfeed', getPost); // Get posts

export default router;
