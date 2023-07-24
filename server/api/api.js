const express = require('express');
const app = require('../server');

const apiRouter = express.Router();
module.exports = apiRouter;

const onRequestHook = require('./activeUser');
apiRouter.use(onRequestHook); // fake user login before each request

const usersRouter = require('./users');
apiRouter.use('/users', usersRouter);

