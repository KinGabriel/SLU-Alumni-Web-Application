import express from 'express';
import {getNews} from '../controller/newsController.js';
import authenticateMiddleware from '../middleware/authenticateMiddleware.js';

const router = express.Router();

router.use(authenticateMiddleware);


router.get('/get-news', getNews); 


export default router;
