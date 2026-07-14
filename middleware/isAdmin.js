
function isAdminSession(req, res, next) {
    console.log(req.session.user)
    
    // if the logged in user is an admin continue to the admin panel, otherwise redirect to home
    if (req.session.user && req.session.user.isAdmin) {
        next()
    }
    else {
        res.redirect('/')
    }

}
module.exports = isAdminSession