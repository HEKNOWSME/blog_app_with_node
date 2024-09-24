require('express-async-errors')
const express = require('express');
const app = express();
require('./startup/db')();
require('./startup/routes')(app);
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Blog app listening on port ${port}!`))