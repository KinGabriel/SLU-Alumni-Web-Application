import express from 'express';
import { getAlumni,handleLogout} from '../controller/alumniController.js'; 

const router = express.Router();

router.get('/homefeed', getAlumni);// get start up info
router.get('/logout', handleLogout); // log out
router.post('/postfeed', ) // let the user post

export default router;
