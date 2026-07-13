const router = require("express").Router()
const isSignedIn = require("../middleware/is-signed-in");
const Entry = require('../models/Entry')


router.get('/new', isSignedIn, (req, res, next) => {
    res.render('add-journal.ejs')
    next()
})

router.post('/new', async (req, res) => {

    const currentUser = req.session.user

    await Entry.create({
        title: req.body.title,
        entryBody: req.body.entryBody,
        isPublic: Boolean(req.body.isPublic),
        owner: currentUser._id
    })
    res.redirect('/all')
})

router.get('/all', async (req, res) => {
    const allPublicEntries = await Entry.find({ isPublic: true })

    res.render('all-entries.ejs', { allPublicEntries })
})

router.get('/my-entries', isSignedIn, async(req, res) => {
    const myId = req.session.user._id
    const myEntries = await Entry.find({ owner: myId })
    if (!myEntries){
        res.send('empty entries')
    }
    res.render('my-entries.ejs', { myEntries })
})

module.exports = router;
