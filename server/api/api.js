const express = require('express');
const app = require('../server');

const apiRouter = express.Router();
module.exports = apiRouter;

const loginRouter = require('./login');
apiRouter.use('/login', loginRouter);

const investmentsRouter = require('./investments');
apiRouter.use('/investments', investmentsRouter);

const companiesRouter = require('./companies');
apiRouter.use('/companies', companiesRouter);

const usersRouter = require('./users');
apiRouter.use('/users', usersRouter);

const paymethodsRouter = require('./paymethods');
usersRouter.use('/:userId/paymethods', paymethodsRouter);

const transactionsRouter = require('./transactions');
usersRouter.use('/:userId/transactions', transactionsRouter);

const purchasedInvestmentsRouter = require('./purchasedInvestments');
usersRouter.use('/:userId/purchases', purchasedInvestmentsRouter);
