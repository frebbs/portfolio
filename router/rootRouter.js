const express = require('express')
const router = express.Router()
const { UserProfile} = require('../schema/userSchema');

let users = [
    {
        username: 'Aaron',
        email: 'aaron@gmail.com',
        password: 'password',
        loggedIn: false
    },
]

router.get('/', (req, res) => {
    console.log(users)
    res.render('index', {loggedIn: req.session.profile ? true : false});
});

router.get('/json', (req, res) => {
    res.json(users);
});

router.get('/logout/user', (req, res) => {
    req.session = null;
    res.redirect('/')
})

router.post('/register/user', (req, res) => {


    const newUser = new UserProfile({
        emailAddress: req.body.email,
        username: req.body.username,
        password: req.body.password
    });
    users.push(newUser)
    res.redirect('/');;
});

router.post('/login/user', (req, res) => {

    let foundUser = users.forEach((item) => {
        if (item.email === req.body.email) {
                req.session.profile = {
                    username: item.username,
                    email: item.email,
                    ID: req.sessionID,
                    loggedIn: true
                }
                return true
            }
            
        })


            res.redirect('/members')

});



module.exports = router;