/* 
Session Middleware: Configures and manages user sessions for the application
- Establishes a secure session mechanism using the 'express-session' library
- Utilizes a randomly generated secret key to enhance session security
- Configures session cookies for client-server communication
- Secret Key: Dynamically generated using the 'crypto' library
        - `resave: false`: Prevents session resaving if unmodified
        - `saveUninitialized: false`: Avoids storing uninitialized sessions
        - `cookie.secure: false`: Suitable for development (should be `true` in production with HTTPS)
- Enhances application security and user state management
Dependencies:
    - express-session (https://www.npmjs.com/package/express-session)
    -crypto (built-in Node.js library)
Group Member Responsible: Caparas, Joaquin Gabriel
*/


import session from 'express-session';
import { randomBytes } from 'crypto';

const key = randomBytes(16).toString('hex');

const sessionMiddleware = session({
    secret: key,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
});

export default sessionMiddleware;
