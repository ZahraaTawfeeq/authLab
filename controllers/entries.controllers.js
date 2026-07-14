const router = require("express").Router()
const isSignedIn = require("../middleware/is-signed-in");
const Entry = require('../models/Entry')


router.get('/new', isSignedIn, (req, res, next) => {
    try {
        res.render('add-journal.ejs')
        next()
    } catch (err) { console.log('cannot redirect to add journal ', err) }
})

router.post('/new', async (req, res) => {
    try {
        const currentUser = req.session.user

        await Entry.create({
            title: req.body.title,
            entryBody: req.body.entryBody,
            isPublic: Boolean(req.body.isPublic),
            owner: currentUser._id
        })
        res.redirect('/entries/my-entries')
    } catch (err) { console.log('cannot add journal ', err) }
})

router.get('/all', async (req, res) => {
    try {
        const allPublicEntries = await Entry.find({ isPublic: true })

        res.render('all-entries.ejs', { allPublicEntries })
    } catch (err) { console.log('cannot view journals ', err) }
})

router.get('/my-entries', isSignedIn, async (req, res) => {
    try {
        const myId = req.session.user._id
        const myEntries = await Entry.find({ owner: myId })
        if (!myEntries) {
            res.send('empty entries')
        }
        res.render('my-entries.ejs', { myEntries })
    } catch (err) { console.log('cannot get users entries ', err) }
})

module.exports = router;
