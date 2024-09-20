const express = require('express');
const {blocked} = require('../middleware/isdeleted')
const {validatePost} = require('../models/post');
const auth = require('../middleware/auth');
const { User } = require('../models/user');
const router = express.Router();
router.get('/', async(req, res) => {
       const users = await User.find()
       res.render('index', {users, req})
})
router.get('/article/:id', [auth, blocked], async(req, res) => {
       const user = await User.findById(req.user.id)
       const posts = user.posts
       const post = posts.id(req.params.id)
       if(!post) return res.status(401).send('we don`t have this post')
       res.render('updatePost', {post})
})
router.delete('/article/:id', auth,  async(req, res) => {
       const user = await User.findById(req.user.id)
       const posts = user.posts
       const post = posts.id(req.params.id)
       if(!post) return res.status(404).send('this post is unavailable')
       post.deleteOne()
       user.save()
       res.redirect('/auth')
})
router.put('/article/:id', auth, async(req, res) => {
       const {error} = validatePost(req.body);
       if(error) return res.status(404).send(error.details[0].message);

       const user = await User.findById(req.user.id)
       const posts = user.posts
       const post = posts.id(req.params.id)
       post.title = req.body.title
       post.slung = req.body.slung
       post.text = req.body.text
       user.save()
       res.redirect('/auth');
})
module.exports = router