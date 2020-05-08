const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    console.log(req.session.userData)

    res.render('members', {session: req.session.userData.profile})
})

module.exports = router;