import express from 'express';
import {getJobs} from '../controller/jobsController.js';
import authenticateMiddleware from '../middleware/authenticateMiddleware.js';

const router = express.Router();

router.use(authenticateMiddleware);

router.get('/getJobs', getJobs);

export default router;
