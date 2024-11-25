import express from 'express';
import { getAlumni } from '../controller/alumniController.js'; 

const router = express.Router();

router.get('/homefeed', getAlumni);// get start up info
router.get('/logout', (req, res) => {// log out
    req.session.destroy(err => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.status(500).send('An error occurred while logging out.');
        }
        res.clearCookie('user_id');
        res.redirect('http://localhost/SLU-Alumni-Web-Application/LogInAndRegister/view/Login.php');
    });
});

export default router;
