import express from 'express';
import path from 'path';
import alumniRoutes from './routes/alumniRoute.js';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { randomBytes } from 'crypto';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const key = randomBytes(16).toString('hex');
app.use(session({
    secret: 'key',  
    resave: false, 
    saveUninitialized: false,  
    cookie: { secure: false } 
}));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/node_modules', express.static(path.join(__dirname, '../node_modules')));
app.use(express.static(path.join(__dirname, '../view')));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/view/AlumniFeed.html'));
});

app.use("/api", alumniRoutes);

const port = 8080;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
