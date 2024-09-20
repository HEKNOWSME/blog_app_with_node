const Joi = require("joi");
function validatePost(post) {
       return Joi.object({
              title: Joi.string().min(5).max(255).required(),
              slug: Joi.string().min(5).max(255).required(),
              text: Joi.string().min(5).max(1024).required()
       }).validate(post)
}
exports.validatePost = validatePost