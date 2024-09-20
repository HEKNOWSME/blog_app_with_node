const { User } = require("../models/user")

module.exports.blocked = async(req, res, next) => {
       const user = await User.findById(req.user.id)
       if(!user) return res.status(403).redirect('/users')
       next()
}