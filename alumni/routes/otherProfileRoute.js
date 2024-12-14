import express from 'express';
import {getOtherUserInfo,follow,unfollow,isFollowing,getOtherPost} from '../controller/otherProfileController.js';
import authenticateMiddleware from '../middleware/authenticateMiddleware.js';

const router = express.Router();

router.use(authenticateMiddleware);
router.get('/get-profile', getOtherUserInfo);
router.post('/follow', follow);
router.post('/unfollow', unfollow)
router.get('/is-following', isFollowing); 
router.get('/get-post',getOtherPost );
export default router;