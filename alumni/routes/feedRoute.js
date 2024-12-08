import express from 'express';
import {handleUserPost, getPost,handleComments,handleLikes,getComments } from '../controller/feedController.js';
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
router.post('/send-comment', handleComments);
router.post('/like/:postId', handleLikes);
router.get('/getComments/:postId',getComments );

export default router;