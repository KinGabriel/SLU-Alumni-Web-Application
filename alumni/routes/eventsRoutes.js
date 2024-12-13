import express from 'express';
import {getEvents} from '../controller/eventsController.js';
import authenticateMiddleware from '../middleware/authenticateMiddleware.js';

const router = express.Router();

router.use(authenticateMiddleware);

router.get('/get-events', getEvents) 




export default router;
