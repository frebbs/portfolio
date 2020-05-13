const express = require('express')
const router = express.Router()
const { UserProfile} = require('../schema/userSchema');
const { UserPost} = require('../schema/postSchema');

const bcrypt = require('bcrypt');
const SALT = 10;


router.get('/', async(req, res) => {
    let posts = await UserPost.find().populate('createdBy', 'username')
        .sort({createdOn: 'desc'})
        .limit(2)
        .catch((err) => {
            console.log(err)
        })
    res.render('index', {session: req.session ? req.session.userData : null, posts});
});

router.get('/json/:id', async(req, res) => {
    let users = await UserProfile.findOne({"username": req.params.id}).populate("posts")
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
            emailAddress: email,
            username: username,
            security: {
                password: hash
            }
        });
        console.log(newUser)
        newUser.save();
        return res.redirect('/');;
    })
});

router.post('/login/user', async(req, res) => {
    const {email, password, password2} = req.body;
    let foundUser = await UserProfile.findOne({"emailAddress": email}).select('+security.password')

    if (foundUser) {
        await bcrypt.compare(password, foundUser.security.password, (err, resp) => {
            if (err) console.log(err)
            if (resp) {
                let foundUserProfile = {
                    userKey: foundUser._id,
                    username: foundUser.username,
                    email: foundUser.emailAddress,
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
