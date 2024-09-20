const express = require('express');
const {validatePost} = require('../models/post');
const {User} = require('../models/user')
const {blocked} = require('../middleware/isdeleted')
const auth = require('../middleware/auth');
const { default: mongoose } = require('mongoose');
const router = express.Router();
router.get('/post', [auth, blocked],  async(req, res) => {
       const user = req.user;
       res.render('post', {user});
})
router.post('/users/post', auth, async(req, res) => {
       const {error} = validatePost(req.body)
       if(error) return res.status(404).send(error.details[0].message);
       const post = ({
              title: req.body.title,
              slug: req.body.slug,
              text: req.body.text
       });
       const user = await User.findById(req.user.id)
       user.posts.push(post)
       user.save()
       res.redirect('/auth');
});
router.get('/post/:id', [auth, blocked], async(req, res) => {
       if(!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(404).send('invalid Id');
       const post = await Post.findById(req.params.id);
       if(!post) return res.status(404).send('not found');
       const user = req.user
       if(user.email !== post.email) return res.status(404).send('this post is not yours')
       else res.render('updatePost', {post})
})
module.exports = router