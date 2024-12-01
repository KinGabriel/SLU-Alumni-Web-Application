import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import alumniRoutes from './routes/alumniRoute.js';
import feedRoutes from './routes/feedRoute.js';
import { cookieMiddleware, cookieParser } from './middleware/cookieMiddleware.js';
import sessionMiddleware from './middleware/sessionMiddleware.js';
import staticMiddleware from './middleware/staticMiddleware.js';
import dotenv from 'dotenv';

// Load environment variables from .env
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middlewares
app.use(cookieParser());
app.use(cookieMiddleware);
app.use(sessionMiddleware);
staticMiddleware(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Web App Entry Point
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/view/AlumniFeed.html'));
});

// API Routes
app.use('/api', alumniRoutes);
app.use('/api', feedRoutes);

// Start the Server
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
