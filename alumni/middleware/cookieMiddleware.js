/* 
Cookie Middleware: Validates and processes user cookies for authentication purposes
- Checks for the presence of the 'user_id' cookie to verify if the user is logged in
- Redirects unauthenticated users to the login page
- Attaches the 'user_id' to the request object for further use in the application
- Uses the 'cookie-parser' library to parse cookies in incoming requests
- Enhances middleware flow by ensuring authenticated users can access protected routes
 - Redirect URL: Login page ('http://localhost/SLU-Alumni-Web-Application/LogInAndRegister/view/Login.php')
Dependencies: cookie-parser (https://www.npmjs.com/package/cookie-parser)
Group Member Responsible: Caparas, Joaquin Gabriel
*/

import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

// Load environment variables from .env
dotenv.config();
const cookieMiddleware = (req, res, next) => {
    const userId = req.cookies.user_id;
    if (!userId) {
        return res.redirect(`http://${process.env.HOST || 'localhost'}/SLU-Alumni-Web-Application/LogInAndRegister/view/Login.php`);

    }
    req.userId = userId; 
    next();
};

export { cookieMiddleware, cookieParser };
