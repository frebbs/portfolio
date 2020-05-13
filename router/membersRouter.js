const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

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



router.get('/posts/:id', async(req, res) => {
    const post = await UserPost.findOne({_id: req.params.id})
    // res.json({
    //     message: "Post Found",
    //     data: post
    // })
    res.render('userPost', {session: req.session ? req.session.userData : null, post})
})
// POST PUT DEL

router.post('/create/post', async(req, res) => {
    let profileImg = req.files.postImg;
    let fileID = uuidv4();
    let uploadPath = __dirname + '/../public/imgs/' + fileID + "." + profileImg.name;
    let dbPath = `/imgs/${fileID}.${profileImg.name}`
    await profileImg.mv(uploadPath, (err) => {
        if (err)
            return res.status(500).send(err);
    })

    let post = new UserPost({
        title: req.body.title,
        body: req.body.body,
        postImg: dbPath,
        createdBy: req.session.userData.profile.userKey
    })
    await post.save()

    let user = await UserProfile.findOne({_id: req.session.userData.profile.userKey})
    await user.posts.push(post._id)
    await user.save()
    res.redirect('/members');
})

module.exports = router;