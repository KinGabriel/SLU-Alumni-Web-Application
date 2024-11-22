import express from 'express';
import { getAlumni } from '../controller/alumniController.js'; 

const router = express.Router();

router.get('/', getAlumni);

export default router;
