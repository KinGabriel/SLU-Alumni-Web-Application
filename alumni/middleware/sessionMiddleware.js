/* 
Session Middleware: Configures and manages user sessions for the application
- Establishes a secure session mechanism using the 'express-session' library
- Utilizes a randomly generated secret key to enhance session security
- Configures session cookies for client-server communication
- Secret Key: Stored in the env file
- Enhances application security and user state management
Dependencies:
    - express-session (https://www.npmjs.com/package/express-session)
    -crypto (built-in Node.js library)
Group Member Responsible: Caparas, Joaquin Gabriel
*/
import session from 'express-session';
import dotenv from 'dotenv';

dotenv.config();  

const sessionMiddleware = session({
    secret: process.env.SESSION_SECRET || 'aluminaDefault',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
});

export default sessionMiddleware;
