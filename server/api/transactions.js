const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const transactionsRouter = express.Router({mergeParams: true});
module.exports = transactionsRouter;

const TRANSACTION_SELECT_FIELDS = {
    id: true,
    date: true,
    description: true,
    amount: true,
    roundedAmount: true,
    fundContribution: true,
    user: {
        select: {
            id: true,
            name: true,
        },
    },
    paymethod: {
        select: {
            id: true,
            cardNumber: true,
            type: true,
        },
    },
    company: {
        select: {
            id: true,
            name: true,
        },
    },
}

transactionsRouter.param('transactionId', async (req, res, next, transactionId) => {
    await prisma.transaction.findUniqueOrThrow({ 
        where: { id: transactionId },
        select: TRANSACTION_SELECT_FIELDS,
    })
    .then(transaction => {
        req.transaction = transaction;
        next();
        return;
    })
    .catch(error => {
        console.log(error);
        return res.status(404).send("Transaction not found");
    });
});


/*
Get -> Read operations:
*/

transactionsRouter.get('/', async (req, res) => {
    return await prisma.transaction.findMany({ 
        where: { userId: req.params.userId },
        select: TRANSACTION_SELECT_FIELDS,
    }).then(transactions => {
        transactions.sort(function(a, b){
            return new Date(b.date) - new Date(a.date);
        });
        return res.status(200).json(transactions);
    }).catch(error => {
        console.log(error);
        return res.status(400).send("Transactions not found");
    });
});

transactionsRouter.get('/:transactionId', (req, res) => {
    res.status(200).send(req.transaction);
});

/*
Post -> Create operations:
*/

const validateTransaction = (req, res, next) => {
    const toCreateTransaction = req.body.transaction;
    if (!toCreateTransaction.paymethodId || !toCreateTransaction.companyId || !toCreateTransaction.amount || !toCreateTransaction.roundedAmount || !toCreateTransaction.fundContribution) {
        return res.status(400).send("Missing information");
    }

    // If date is missing, set transaction date to now
    if (!toCreateTransaction.date) {
        const now = new Date();
        req.body.transaction.date = now;
    }

    next();
};

const validateCompany = (req, res, next) => {
    prisma.company.findUniqueOrThrow({ 
        where: { id: req.body.transaction.companyId || req.transaction.companyId },
        select: { id: true },
    })
    .then(company => {
        req.company = company;
        next();
        return;
    })
    .catch(error => {
        console.log(error);
        return res.status(404).send("Payment method not found");
    });
};

const validatePayment = (req, res, next) => {
    prisma.paymethod.findUniqueOrThrow({ 
        where: { id: req.body.transaction.paymethodId || req.transaction.paymethodId },
        select: { id: true },
    })
    .then(paymethod => {
        req.paymethod = paymethod;
        next();
        return;
    })
    .catch(error => {
        console.log(error);
        return res.status(404).send("Payment method not found");
    });
};

transactionsRouter.post('/', validateTransaction, validateCompany, validatePayment, async (req, res) => {    
    const newTransaction = req.body.transaction;
    return await prisma.transaction.create({
        data: {
            date: newTransaction.date,
            description: newTransaction.description,
            amount: newTransaction.amount,
            roundedAmount: newTransaction.roundedAmount,
            fundContribution: newTransaction.fundContribution,
            userId: newTransaction.userId,
            paymethodId: req.paymethod.id,
            companyId: req.company.id,
        },
        select: TRANSACTION_SELECT_FIELDS
    }).then(transaction => {
        return res.status(201).send(transaction);
    }).catch(error => {
        console.log(error);
        return res.status(400).send("Unable to create transaction");
    });
});

/*
Put -> Update operations:
*/

transactionsRouter.put('/:transactionId', validateCompany, validatePayment, async (req, res) => {
    const newTransaction = req.body.transaction;
    return await prisma.transaction.update({
        where: { id: req.transaction.id },
        data: {
            date: newTransaction.date || req.transaction.date,
            description: newTransaction.description || req.transaction.description,
            amount: newTransaction.amount || req.transaction.amount,
            roundedAmount: newTransaction.roundedAmount || req.transaction.roundedAmount,
            fundContribution: newTransaction.fundContribution || req.transaction.fundContribution,
            userId: req.params.userId  || req.transaction.userId,
            paymethodId: req.paymethod.id || req.transaction.paymethodId,
            companyId: req.company.id || req.transaction.companyId,
        },
        select: TRANSACTION_SELECT_FIELDS
    }).then(transaction => {
        return res.status(201).send(transaction);
    }).catch(error => {
        console.log(error);
        return res.status(400).send("Unable to update transaction");
    });
});

/*
Delete -> Delete operations:
*/

transactionsRouter.delete('/:transactionId', async (req, res) => {
    return await prisma.transaction.delete({
        where: { id: req.transaction.id },
        select: { id: true },
    }).then(transaction => {
        return res.status(202).send(transaction);
    }).catch(error => {
        console.log(error);
        return res.status(400).send("Unable to delete transaction");
    })
});
