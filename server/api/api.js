const express = require('express');
const app = require('../server');

const apiRouter = express.Router();
module.exports = apiRouter;

const onRequestHook = require('./activeUser');
apiRouter.use(onRequestHook); // fake user login before each request

apiRouter.use('/login', (req, res) => {
    res.send({
        token: 'test123'
    });
});

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
