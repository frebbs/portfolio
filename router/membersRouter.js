const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {

    res.render('members', {loggedIn: true, profile: req.session.profile})
})

module.exports = router;