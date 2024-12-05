import express from 'express';
import {connections,removeFollowing,removeFollower} from '../controller/connectionController.js';
import authenticateMiddleware from '../middleware/authenticateMiddleware.js';

const router = express.Router();

router.use(authenticateMiddleware);

router.get('/connection', connections);
router.delete('/remove-following/:user_id', removeFollowing);
router.delete('/remove-follower/:user_id', removeFollower);


export default router;
