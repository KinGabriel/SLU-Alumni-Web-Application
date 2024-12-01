import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import alumniRoutes from './routes/alumniRoute.js';
import { cookieMiddleware, cookieParser } from './middleware/cookieMiddleware.js';
import sessionMiddleware from './middleware/sessionMiddleware.js';
import staticMiddleware from './middleware/staticMiddleware.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

// middlewares
app.use(cookieParser());
app.use(cookieMiddleware);
app.use(sessionMiddleware);
staticMiddleware(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// web app entry point
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/view/AlumniFeed.html'));
});

// API routes
app.use('/api', alumniRoutes);

// Start the server
const port = 8080;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
