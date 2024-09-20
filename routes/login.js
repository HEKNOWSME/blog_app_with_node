const Joi = require("joi");
const auth = require('../middleware/auth');
const {blocked} = require('../middleware/isdeleted');
const express = require('express');
const {User} = require('../models/user');
const {compare } = require('bcrypt');
const router = express.Router();
router.get('/login', async(req, res) => {
       res.render('login')
})
router.post('/users/auth', async(req, res) => {
       const {error} = validateUser(req.body)
       if(error) return res.status(404).send(error.details[0].message);
       const user = await User.findOne({email: req.body.email});
       if(!user) return res.status(400).redirect('/login');
       if(!await compare(req.body.password, user.password)) return res.status(400).redirect('/login');
       const token = user.generateToken();
       res.cookie('auth', token, {
              cookie: {
                     maxAge: 1000 * 60 * 15
              }
       }).redirect('/auth')
});
router.get('/auth', [auth, blocked],  async(req, res) => {
       const user = await User.findById(req.user.id)
       const posts = user.posts;
       res.render('auth', {posts})
});
router.get('/logout', [auth, blocked], async(req, res) => {
       const userID = req.user.id
       const user = await User.findById(userID);
       const token = user.generateToken();
       res.cookie('auth', token, {
              maxAge: 0
       }).redirect('/')
})
function validateUser(user) {
       return Joi.object({
              email: Joi.string().min(5).max(255).required(),
              password: Joi.string().min(5).max(1024).required(),
       }).validate(user)
}
module.exports = router
