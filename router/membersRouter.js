const express = require('express');
const router = express.Router();

const { UserPost} = require('../schema/postSchema');
const { UserProfile} = require('../schema/userSchema');

router.get('/', async(req, res) => {

    let posts = await UserPost.find({"createdBy": req.session.userData.profile.userKey})
        .sort({createdOn: 'desc'})
        .limit(5)
        .catch((err) => {
            console.log(err)
        })

    res.render('members', {session: req.session.userData.profile, posts})
})

router.get('/create/post', (req, res) => {
    res.render('createPost', {session: req.session.userData.profile});
})

// POST PUT DEL

router.post('/create/post', async(req, res) => {
    let post = new UserPost({
        title: req.body.title,
        body: req.body.body,
        createdBy: req.session.userData.profile.userKey
    })
    await post.save()

    let user = await UserProfile.findOne({_id: req.session.userData.profile.userKey})
    user.posts.push(post._id)
    user.save()
    res.redirect('/members');
})

module.exports = router;