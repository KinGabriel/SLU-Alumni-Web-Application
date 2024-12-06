import express from 'express';
import {getOwnPost,handleLikes} from '../controller/userProfileController.js';
import authenticateMiddleware from '../middleware/authenticateMiddleware.js';

const router = express.Router();

router.use(authenticateMiddleware);
router.get('/getOwnFeed', getOwnPost); 
router.post('/like/:postId', handleLikes);
router.delete('/delete/:postId', );
router.post('/editPost/:postId', );

export default router;