const express = require('express')
const router = express.Router()
let users = [
    {
        name: 'Aaron',
        email: 'aaron@gmail.com',
        password: 'password'
    },
    {
        name: 'Sally',
        email: 'sally@gmail.com',
        password: 'password'
    },
    {
        name: 'Bob',
        email: 'bob@gmail.com',
        password: 'password'
    },
]

router.get('/json', (req, res) => {
    res.json(users)
})

module.exports = router;