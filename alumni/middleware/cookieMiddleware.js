import cookieParser from 'cookie-parser';

const cookieMiddleware = (req, res, next) => {
    const userId = req.cookies.user_id;
    if (!userId) {
        return res.redirect('http://localhost/SLU-Alumni-Web-Application/LogInAndRegister/view/Login.php');
    }
    next();
};

export { cookieMiddleware, cookieParser };
