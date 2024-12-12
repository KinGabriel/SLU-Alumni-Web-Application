import express from 'express';
import {} from '../controller/eventsController.js';
import authenticateMiddleware from '../middleware/authenticateMiddleware.js';

const router = express.Router();

router.use(authenticateMiddleware);



export default router;
