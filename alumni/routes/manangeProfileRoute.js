import express from 'express';
import {getProfileInfo,updateProfile,updatePassword} from '../controller/manageProfileController.js';
import authenticateMiddleware from '../middleware/authenticateMiddleware.js';


const router = express.Router();

router.use(authenticateMiddleware);

router.get('/get-info', getProfileInfo);
router.get('/update-details',updateProfile );
router.post('/change-password', updatePassword);

export default router;