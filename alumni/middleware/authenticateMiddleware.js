/*
Authentication Middleware: Ensures users are authenticated before accessing protected routes
Redirects unauthenticated users to the login page
- Checks for 'user_id' in cookies to verify if the user is logged in
- Redirects to the login page if the 'user_id' cookie is not present
- Proceeds to the next middleware or route handler if authenticated
URL Redirected To: Login page ('http://localhost/SLU-Alumni-Web-Application/LogInAndRegister/view/Login.php')
Group Member Responsible:  Caparas, Joaquin Gabriel
*/

const authMiddleware = (req, res, next) => {
    const userId = req.cookies.user_id;
    if (!userId) {
        return res.redirect('http://localhost/SLU-Alumni-Web-Application/LogInAndRegister/view/Login.php');
    }
    next();
};

export default authMiddleware;
