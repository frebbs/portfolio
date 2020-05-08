const express = require('express')
const router = express.Router()
const { UserProfile} = require('../schema/userSchema');


router.get('/', (req, res) => {
    res.render('index', {loggedIn: req.session.profile ? true : false});
});

router.get('/json', async(req, res) => {
    let users = await UserProfile.find();
    res.json(users);
});

router.get('/logout/user', (req, res) => {
    req.session = null;
    res.redirect('/')
})

router.post('/register/user', (req, res) => {

    const newUser = new UserProfile({
        profile: {
            emailAddress: req.body.email,
            username: req.body.username,
        },
        security: {
            password: req.body.password
        }
    });
    newUser.save();
    res.redirect('/');;
});

router.post('/login/user', async(req, res) => {
    const {email, password, password2} = req.body;
    console.log(email)
    let foundUser = await UserProfile.findOne({"profile.emailAddress": email}).select('+security.password')
    console.log(foundUser)
    res.redirect('/')

});



module.exports = router;