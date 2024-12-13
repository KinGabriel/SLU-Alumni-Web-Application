import express from 'express';
import {getEvents,getEventsDetails} from '../controller/eventsController.js';
import authenticateMiddleware from '../middleware/authenticateMiddleware.js';

const router = express.Router();

router.use(authenticateMiddleware);

router.get('/get-events', getEvents) 
router.get('/details/:events_id', getEventsDetails);



export default router;
