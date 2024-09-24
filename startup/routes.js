const methodOverride = require('method-override');
const post = require('../routes/posts');
const express = require('express');
const error = require('../middleware/error')
const users = require('../routes/users');
const admin = require('../routes/admin');
const login = require('../routes/login');
const index = require('../routes/articles,');
module.exports = function(app) {
       app.set('view engine', 'ejs');
       app.use(express.static('public'));
       app.use(express.json());
       app.use(methodOverride('_method'));
       app.use(express.urlencoded({extended: false}));
       app.use('/', post);
       app.use('/', index);
       app.use('/', users);
       app.use('/', admin);
       app.use('/', login);
       app.use(error)
}