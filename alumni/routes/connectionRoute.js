import express from 'express';
import {connections,removeFollowing,removeFollower,acceptFollower} from '../controller/connectionController.js';
import authenticateMiddleware from '../middleware/authenticateMiddleware.js';

const router = express.Router();

router.use(authenticateMiddleware);

router.get('/get-connection', connections);
router.delete('/remove-following/:user_id', removeFollowing);
router.delete('/remove-follower/:user_id', removeFollower);
router.post('/acceptRequest/:user_id',acceptFollower );


export default router;
