const { User } = require("../models/user")

module.exports.remove = async (req, res, next) => {
       const users = await User.find()
       for(let user of users) {
              for(let post of user.posts){
                  if(parseInt(post._id) === parseInt(req.params.id)) {
                     post.deleteOne()
                     user.save()
                     return next()
                  }
              }
       }
       return res.send('this post is unavailable')
}