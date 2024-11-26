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

app.use(cookieParser()); // to fetch the userid from the php login
app.use((req, res, next) => {
    const userId = req.cookies.user_id; 
    if (!userId) {
        return res.redirect('http://localhost/SLU-Alumni-Web-Application/LogInAndRegister/view/Login.php'); // redirect back to the log in page
    }
    next(); 
});
// create a session
const key = randomBytes(16).toString('hex'); // generate a randon key
app.use(session({
    secret: 'key',  
    resave: false, 
    saveUninitialized: false,  
    cookie: { secure: false } 
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/node_modules', express.static(path.join(__dirname, '../node_modules')));
app.use(express.static(path.join(__dirname, '../view')));

//enter the webapp
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/view/AlumniFeed.html'));
});

app.use("/api", alumniRoutes);

const port = 8080;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
