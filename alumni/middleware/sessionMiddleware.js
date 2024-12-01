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
