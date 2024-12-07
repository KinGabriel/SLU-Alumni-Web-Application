import express from 'express';
import {getOwnPost,handleLikes,editPost} from '../controller/userProfileController.js';
import authenticateMiddleware from '../middleware/authenticateMiddleware.js';
import fileUploadMiddleware from '../middleware/fileUploadMiddleware.js';

const router = express.Router();

router.use(authenticateMiddleware);
router.get('/getOwnFeed', getOwnPost); 
router.post('/like/:postId', handleLikes);
router.delete('/delete/:postId', );
router.post(
    '/editPost/:postId',
    fileUploadMiddleware.fields([
        { name: 'images[]', maxCount: 5 },
        { name: 'videos[]', maxCount: 2 }
    ]),
    editPost
);
export default router;