const router = require("express").Router()
const User = require("../models/user.js");
const isAdminSession = require("../middleware/isAdmin");


router.get('/', (req, res) => {
    res.render('homepage.ejs')
})

// ADMIN ROUTE
router.get('/admin', isAdminSession, async (req, res) => {
    try {
        const users = await User.find({})
        res.render('admin-panel.ejs', { users })
    } catch (err) { console.log('cannot redirect to admin panel ', err) }
})

router.put('/admin/:id', async (req, res) => {
    try {
        if (isAdminSession) {
            await User.findByIdAndUpdate(req.params.id, {
                isDeleted: true
            })
            res.redirect('/admin')
        }
        else {
            console.log('You dont have the permission to delete users')
        }
    } catch (err) {
        console.log('Cannot delete user', err)
    }
})
module.exports = router;
