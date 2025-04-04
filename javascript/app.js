const express = require('express');
const app = express();

app.listen(7777);

const userRouter = require('../routes/users');
const authorRouter = require('../routes/authors');

app.use('/', userRouter);
app.use('/authors', authorRouter);
