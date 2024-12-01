import express from 'express';
import {handleUserPost, getPost } from '../controller/feedController.js';
import fileUploadMiddleware from '../middleware/fileUploadMiddleware.js';
import authenticateMiddleware from '../middleware/authenticateMiddleware.js';

const router = express.Router();

// authenticattor
router.use(authenticateMiddleware);


router.post(
    '/postfeed',
    fileUploadMiddleware.fields([
        { name: 'images[]', maxCount: 5 },
        { name: 'videos[]', maxCount: 2 }
    ]),
    handleUserPost
);

router.get('/getfeed', getPost); // Get posts

export default router;