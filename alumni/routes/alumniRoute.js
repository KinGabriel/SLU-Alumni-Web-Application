import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { getAlumni, handleLogout } from '../controller/alumniController.js';
import {handleUserPost, getPost } from '../controller/feedController.js';
import fileUploadMiddleware from '../middleware/fileUploadMiddleware.js';
import authenticateMiddleware from '../middleware/authenticateMiddleware.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// authenticattor
router.use(authenticateMiddleware);

// Routes
router.get('/homefeed', getAlumni); // Get startup info
router.get('/logout', handleLogout); // Log out

// Serve static HTML files
router.get('/events', (req, res) => res.sendFile(path.join(__dirname, '../view/AlumniEvents.html')));
router.get('/connections', (req, res) => res.sendFile(path.join(__dirname, '../view/AlumniConnections.html')));
router.get('/jobs', (req, res) => res.sendFile(path.join(__dirname, '../view/AlumniJobOpp.html')));
router.get('/manageProfile', (req, res) => res.sendFile(path.join(__dirname, '../view/AlumniManageProfile.html')));
router.get('/news', (req, res) => res.sendFile(path.join(__dirname, '../view/AlumniNews.html')));

export default router;
