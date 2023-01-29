function loginRequired(req, res, next) {
    if (!req.user) {
        return res.redirect("/auth/login");
    }
    next();
}
function loggedAlready(req, res, next) {
    if (req.user) {
        return res.redirect('/');
    }
    next();
}

module.exports = {
    loginRequired,
    loggedAlready
}