const express = require('express');
const {admin} = require('../middleware/admin')
const  {remove} = require('../middleware/delete')
const  {blocked} = require('../middleware/isdeleted')
const auth = require('../middleware/auth');
const { User } = require('../models/user');
const router = express.Router();
router.get('/admin', [auth, admin, blocked], async(req, res, next) => {
       try {
              const user = req.user
              if(!user) return res.status(403).redirect('/login')
              const users = await User.find()
              res.render('admin', {users})
       } catch (error) {
              next(error)
       }
})
router.delete('/post/:id', [auth, remove],  async(req, res) => {
       res.redirect('/admin')
})














module.exports = router