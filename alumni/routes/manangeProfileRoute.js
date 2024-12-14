import express from 'express';
import multer from 'multer';
import { getProfileInfo, updateProfile, updatePassword, updatePFP } from '../controller/manageProfileController.js';
import authenticateMiddleware from '../middleware/authenticateMiddleware.js';

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() }); 
router.use(authenticateMiddleware);

router.get('/get-info', getProfileInfo);
router.post('/update-details', updateProfile);
router.post('/change-password', updatePassword);
router.post('/upload-pfp', upload.single('pfp'), updatePFP); 

export default router;
