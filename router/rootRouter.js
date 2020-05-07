const express = require('express')
const router = express.Router()
let users = [
    {
        username: 'Aaron',
        email: 'aaron@gmail.com',
        password: 'password',
        loggedIn: false
    },
    {
        username: 'Bob',
        email: 'bob@gmail.com',
        password: 'password',
        loggedIn: false
    },
]

router.get('/', (req, res) => {
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
    users.push({username: req.body.username, email: req.body.email, password: req.body.password, loggedIn: false})
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