import express from 'express';
import {getJobs,getJobsDetails} from '../controller/jobsController.js';
import authenticateMiddleware from '../middleware/authenticateMiddleware.js';

const router = express.Router();

router.use(authenticateMiddleware);

router.get('/getJobs', getJobs);
router.get('/details/:jobs_id',getJobsDetails );

export default router;
