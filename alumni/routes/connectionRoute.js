import express from 'express';
import {mutualConnections} from '../controller/connectionController.js';
import authenticateMiddleware from '../middleware/authenticateMiddleware.js';

const router = express.Router();

// authenticattor
router.use(authenticateMiddleware);

router.get('/mutual', mutualConnections); 