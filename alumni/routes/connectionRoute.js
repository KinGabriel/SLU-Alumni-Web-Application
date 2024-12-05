import express from 'express';
import {connections} from '../controller/connectionController.js';
import authenticateMiddleware from '../middleware/authenticateMiddleware.js';

const router = express.Router();

router.use(authenticateMiddleware);

router.get('/mutual', connections);

export default router;
