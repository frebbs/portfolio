const express = require('express')
const router = express.Router()
const { UserProfile} = require('../schema/userSchema');
const bcrypt = require('bcrypt');
const SALT = 10;


router.get('/', (req, res) => {
    res.render('index', {session: req.session ? req.session.userData : null});
});

router.get('/json', async(req, res) => {
    let users = await UserProfile.find();
    res.json(users);
});

router.get('/logout/user', (req, res) => {
    req.session = null;
    res.redirect('/')
})

router.post('/register/user', async(req, res) => {

    const {email, username, password, password2} = req.body;
    
    await bcrypt.hash(password, SALT, function(err, hash) {
        if (err) console.log(err)
        const newUser = new UserProfile({
            profile: {
                emailAddress: email,
                username: username,
            },
            security: {
                password: hash
            }
        });
        newUser.save();
        return res.redirect('/');;
    })
});

router.post('/login/user', async(req, res) => {
    const {email, password, password2} = req.body;
    let foundUser = await UserProfile.findOne({"profile.emailAddress": email}).select('+security.password')
    if (foundUser) {
        await bcrypt.compare(password, foundUser.security.password, (err, resp) => {
            if (err) console.log(err)
            if (resp) {
                let foundUserProfile = {
                    username: foundUser.profile.username,
                    email: foundUser.profile.emailAddress,
                    accountStatus: foundUser.metaData.accountStatus,
                    admin: foundUser.security.admin,
                    userCreated: foundUser.metaData.userCreated,
                }
    
                req.session.userData = {
                    profile: foundUserProfile
                }
        
                return res.redirect('/members')
    
            } else {
                return res.redirect('/')
            }
        })
    } else {
        res.redirect('/')
    }

});



module.exports = router;