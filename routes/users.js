const express = require('express');
const {User , validateUser} = require('../models/user');
const { hash } = require('bcrypt');
const auth = require('../middleware/auth');
const { default: mongoose } = require('mongoose');
const Joi = require('joi');
const { admin } = require('../middleware/admin');
const { blocked } = require('../middleware/isdeleted');
const router = express.Router();

router.get('/users', async(req, res) => {
       res.render('signup')
})
router.post('/users', async(req, res) => {
       const {error} = validateUser(req.body)
       if(error) return res.status(404).send(error.details[0].message);
       const user = await User.findOne({email: req.body.email});
       if(user) return res.status(400).send('this email is taken')
       req.body.password = await hash(req.body.password, 10);
       await new User({
              email: req.body.email,
              password: req.body.password,
              username: req.body.username,
       }).save()
       res.redirect('/login')
})
router.get('/update', [auth, blocked], async(req, res) => {
       const user = req.user;
       res.render('update', {user})
});
router.put('/users/:id', async(req, res) => {
       if(!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(404).send('invalid Id');
       const {error} = validateUpdate(req.body)
       if(error) return res.status(404).send(error.details[0].message);
       req.body.password = await hash(req.body.password, 10)
       const user = await User.findByIdAndUpdate(req.params.id, {
              username: req.body.username,
              password: req.body.password
       });
       if(!user) return res.status(404).send('not found');
       res.redirect('/login');
})
router.get('/lists', [auth, admin, blocked], async(req, res) => {
       const users = await User.find()
       res.render('users', {users})
})
router.delete('/users/:id', [auth, admin], async(req, res) => {
       if(!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(404).send('invalid Id');
       const user = await User.findById(req.params.id)
       if(user.isAdmin) return res.status(401).redirect('/lists')
       await User.findByIdAndDelete(req.params.id);
       res.redirect('/lists')

})

function validateUpdate(user) {
       return Joi.object({
              username: Joi.string().min(5).max(255),
              password: Joi.string().min(5).max(1024),
       }).validate(user)
}
module.exports = router