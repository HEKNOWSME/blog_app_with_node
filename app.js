const post = require('./routes/posts');
const users = require('./routes/users');
const admin = require('./routes/admin');
const login = require('./routes/login');
const index = require('./routes/articles,');
const express = require('express');
const methodOverride = require('method-override');
const { default: mongoose } = require('mongoose');
mongoose.connect('mongodb://localhost:27017/personal-blog')
.then(() => console.log('connected'))
.catch(error => console.log(error.message))
const app = express();
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
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Blog app listening on port ${port}!`))