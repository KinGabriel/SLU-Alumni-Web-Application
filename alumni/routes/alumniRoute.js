import express from 'express';
import { getAlumni,handleLogout, handleUserPost,getPost} from '../controller/alumniController.js'; 
const router = express.Router();

router.get('/homefeed', getAlumni)// get start up info
router.get('/logout', handleLogout) // log out
router.post('/postfeed',handleUserPost) // let the user post
router.get('/getfeed',getPost)



export default router;
