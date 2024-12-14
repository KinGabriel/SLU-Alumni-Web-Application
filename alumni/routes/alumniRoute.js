import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { getAlumni, handleLogout,searchUsers } from '../controller/alumniController.js';
import authenticateMiddleware from '../middleware/authenticateMiddleware.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// authenticattor
router.use(authenticateMiddleware);

// Routes
router.get('/homefeed', getAlumni); // Get startup info
router.get('/logout', handleLogout); // Log out
router.get('/search', searchUsers); 

// Serve static HTML files
router.get('/events', (req, res) => res.sendFile(path.join(__dirname, '../view/AlumniEvents.html')));
router.get('/events/details', (req, res) => res.sendFile(path.join(__dirname, '../view/AlumniEventsDetails.html')));
router.get('/connections', (req, res) => res.sendFile(path.join(__dirname, '../view/AlumniConnections.html')));
router.get('/jobs', (req, res) => res.sendFile(path.join(__dirname, '../view/AlumniJobOpp.html')));
router.get('/jobs/details', (req, res) => res.sendFile(path.join(__dirname, '../view/AlumniJobDetails.html')));
router.get('/manageProfile', (req, res) => res.sendFile(path.join(__dirname, '../view/AlumniManageProfile.html')));
router.get('/news', (req, res) => res.sendFile(path.join(__dirname, '../view/AlumniNews.html')));
router.get('/news/details', (req, res) => res.sendFile(path.join(__dirname, '../view/AlumniNewsDetails.html')));
router.get('/profile', (req, res) => res.sendFile(path.join(__dirname, '../view/AlumniViewProfile.html')));
router.get('/profile-other', (req, res) => res.sendFile(path.join(__dirname, '../view/AlumniViewOtherUser.html')));
router.get('/manage-profile', (req, res) => res.sendFile(path.join(__dirname, '../view/AlumniManageProfile.html')));

export default router;

