exports.admin = (req, res, next) => {
       if(req.user && req.user.admin)  next();
       else  res.redirect('/auth'); 
}