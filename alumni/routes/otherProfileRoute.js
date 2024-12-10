import express from 'express';
import {getOtherUserInfo,follow,unfollow,isFollowing} from '../controller/otherProfileController.js';
import authenticateMiddleware from '../middleware/authenticateMiddleware.js';

const router = express.Router();

router.use(authenticateMiddleware);
router.get('/get-profile', getOtherUserInfo);
router.post('/follow', follow);
router.post('/unfollow', unfollow)
router.get('/is-following', isFollowing); 
export default router;