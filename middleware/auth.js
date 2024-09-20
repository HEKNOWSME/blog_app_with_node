const config = require('config');
const jwt = require('jsonwebtoken');
const auth = (req, res, next) => {
       const cookie = req.headers['cookie'];
       if(!cookie) return res.status(401).redirect('/login');
       try {
              const token = cookie.split('=')[1];
              const decoded = jwt.verify(token, config.get("privateKey"));
              req.user = decoded
              next()
       } catch (error) {
              return res.status(403).redirect('/login');
       }

}

module.exports = auth