import express from 'express';
import path from 'path';
import alumniRoutes from './routes/alumniRoute.js'; 
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser'; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json()); 
app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); 
app.use(express.static(path.join(__dirname, "assets"))); 

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view")); 
app.use("/alumni", alumniRoutes);

app.get('/user-login', (req, res) => {
    const userId = req.query.user_id;

    if (userId) {
        res.cookie('user_id', userId, { httpOnly: true, secure: false, maxAge: 3600000 }); 
        return res.redirect('/alumni');  
    } else {
        res.status(400).send('User ID is missing!');
    }
});

const port = 8080;
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});