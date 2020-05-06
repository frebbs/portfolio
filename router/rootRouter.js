const express = require('express')
const router = express.Router()
let users = [
    {
        username: 'Aaron',
        email: 'aaron@gmail.com',
        password: 'password'
    }
]

router.get('/', (req, res) => {
    users.forEach((item) => {console.log(item)})
    res.render('index');
});

router.get('/json', (req, res) => {
    res.json(users);
});

router.post('/register/user', (req, res) => {
    users.push({username: req.body.username, email: req.body.email, password: req.body.password})
    res.redirect('/');;
});

router.post('/login/user', (req, res) => {

    res.redirect('/');
});

module.exports = router;