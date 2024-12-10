import express from 'express';
import {getProfileInfo} from '../controller/manageProfileController.js';
import authenticateMiddleware from '../middleware/authenticateMiddleware.js';


const router = express.Router();

router.use(authenticateMiddleware);

router.get('/getinfo', getProfileInfo)



export default router;