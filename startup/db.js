const { default: mongoose } = require('mongoose');
const config = require('config');
const dbUrl = config.get("dbUrl")
module.exports = function() {
      mongoose.connect(dbUrl)
      .then(() => console.log('connected'))
      .catch(error => console.log(error.message))
}