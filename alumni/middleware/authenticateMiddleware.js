const authMiddleware = (req, res, next) => {
    const userId = req.cookies.user_id;
    if (!userId) {
        return res.redirect('http://localhost/SLU-Alumni-Web-Application/LogInAndRegister/view/Login.php');
    }
    next();
};

export default authMiddleware;
