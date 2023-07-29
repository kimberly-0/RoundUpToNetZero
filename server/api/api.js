const express = require('express');
const app = require('../server');

const apiRouter = express.Router();
module.exports = apiRouter;

// const onRequestHook = require('./activeUser');
// apiRouter.use(onRequestHook); // fake user login before each request

const investmentsRouter = require('./investments');
apiRouter.use('/investments', investmentsRouter);

const companiesRouter = require('./companies');
apiRouter.use('/companies', companiesRouter);

const usersRouter = require('./users');
apiRouter.use('/users', usersRouter);

const paymentsRouter = require('./payments');
usersRouter.use('/:userId/payments', paymentsRouter);

const transactionsRouter = require('./transactions');
usersRouter.use('/:userId/transactions', transactionsRouter);

const userInvestmentsRouter = require('./user_investments');
usersRouter.use('/:userId/investments', userInvestmentsRouter);

const userCompaniesRouter = require('./user_companies');
usersRouter.use('/:userId/companies', userCompaniesRouter);