const express = require('express');
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database/database.sqlite');

const transactionsRouter = express.Router({mergeParams: true});
module.exports = transactionsRouter;

transactionsRouter.param('transactionId', (req, res, next, id) => {
    db.get('SELECT * FROM Transactions WHERE id = $transactionId AND user_id = $userId', {
        $transactionId: id,
        $userId: req.user.id
    }, (err, transaction) => {
        if (err) {
            next(err);
        } else if (transaction) {
            req.transaction = transaction;
            next();
        } else {
            res.status(404).send("Transaction not found");
        }
    });
});

const validatePayment = (req, res, next) => {
     db.get('SELECT * FROM Payment WHERE id = $paymentId', {
        $paymentId: req.body.transaction.payment_id
    }, (err, payment) => {
        if (err) {
            next(err);
        } else if (payment) {
            req.payment = payment;
            next();
        } else {
            res.status(404).send("Payment not found");
        }
    });
};

const validateCompany = (req, res, next) => {
     db.get('SELECT * FROM Company WHERE id = $companyId', {
        $companyId: req.body.transaction.company_id
    }, (err, company) => {
        if (err) {
            next(err);
        } else if (company) {
            req.company = company;
            next();
        } else {
            res.status(404).send("Company not found");
        }
    });
};

const validateTransaction = (req, res, next) => {
    const toCreateTransaction = req.body.transaction;
    if (!toCreateTransaction.payment_id || !toCreateTransaction.company_id || !toCreateTransaction.amount || !toCreateTransaction.rounded_amount || !toCreateTransaction.fund_contribution) {
        return res.status(400).send();
    }

    // If date is missing, set transaction date to now
    if (!toCreateTransaction.date) {
        const now = new Date();
        toCreateTransaction.date = now;
    }

    next();
};

/*
Get -> Read operations:
*/

transactionsRouter.get('/', (req, res, next) => {
    db.all('SELECT * FROM Transactions WHERE user_id = $userId', {
        $userId: req.user.id
    }, (err, transactions) => {
        if (err) {
            next(err);
        } else {
            res.status(200).json(transactions);
        }
    });
});

transactionsRouter.get('/:transactionId', (req, res, next) => {
    res.status(200).send(req.transaction);
});


/*
Post -> Create operations:
*/

transactionsRouter.post('/', validatePayment, validateCompany, validateTransaction, (req, res, next) => {
    const toCreateTransaction = req.body.transaction;    
    db.run('INSERT INTO Transactions (user_id, payment_id, company_id, date, description, amount, rounded_amount, fund_contribution) VALUES ($user_id, $payment_id, $company_id, $date, $description, $amount, $rounded_amount, $fund_contribution)', {
        $user_id: req.user.id, 
        $payment_id: toCreateTransaction.payment_id, 
        $company_id: toCreateTransaction.company_id, 
        $date: toCreateTransaction.date, 
        $description: toCreateTransaction.description, 
        $amount: toCreateTransaction.amount, 
        $rounded_amount: toCreateTransaction.rounded_amount, 
        $fund_contribution: toCreateTransaction.fund_contribution
    }, function(err) {
        if (err) {
            next(err);
        }
        db.get('SELECT * FROM Transactions WHERE id = $id', {
            $id: this.lastID
        }, (err, transaction) => {
            if (!transaction) {
                return res.status(500).send();
            }
            res.status(201).send(transaction);
        });
    });
});

/*
Put -> Update operations:
*/

transactionsRouter.put('/:transactionId', validatePayment, validateCompany, validateTransaction, (req, res, next) => {
    const newTransaction = req.body.transaction;    
    db.run('UPDATE Transactions SET user_id = $user_id, payment_id = $payment_id, company_id = $company_id, date = $date, description = $description, amount = $amount, rounded_amount = $rounded_amount, fund_contribution = $fund_contribution WHERE id = $id', {
        $id: req.transaction.id,
        $user_id: req.user.id, 
        $payment_id: newTransaction.payment_id || req.transaction.payment_id, 
        $company_id: newTransaction.company_id  || req.transaction.company_id, 
        $date: newTransaction.date  || req.transaction.date, 
        $description: newTransaction.description  || req.transaction.description, 
        $amount: newTransaction.amount  || req.transaction.amount, 
        $rounded_amount: newTransaction.rounded_amount  || req.transaction.rounded_amount, 
        $fund_contribution: newTransaction.fund_contribution  || req.transaction.fund_contribution
    }, (err) => {
        if (err) {
            next(err);
        }
        db.get('SELECT * FROM Transactions WHERE id = $id', {
            $id: req.transaction.id
        }, (err, transaction) => {
            if (err) {
                next(err);
            } else if (!transaction) {
                return res.status(500).send();
            }
            res.status(200).send(transaction);
        });
    });
});

/*
Delete -> Delete operations:
*/

transactionsRouter.delete('/:transactionId', (req, res, next) => {
    db.run('DELETE FROM Transactions WHERE id = $id', {
        $id: req.transaction.id,
    }, (err) => {
        if (err) {
            next(err);
        }
        return res.status(202).send();
    });
});
