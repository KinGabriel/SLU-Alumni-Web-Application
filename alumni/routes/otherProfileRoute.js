import express from 'express';
import {getOtherUserInfo} from '../controller/otherProfileController.js';
import authenticateMiddleware from '../middleware/authenticateMiddleware.js';

const router = express.Router();

router.use(authenticateMiddleware);
router.get('/get-profile', getOtherUserInfo);

export default router;