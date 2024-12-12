import express from 'express';
import {getNews,getNewsDetails} from '../controller/newsController.js';
import authenticateMiddleware from '../middleware/authenticateMiddleware.js';

const router = express.Router();

router.use(authenticateMiddleware);


router.get('/get-news', getNews); 
router.get('/details/:news_id', getNewsDetails);



export default router;
