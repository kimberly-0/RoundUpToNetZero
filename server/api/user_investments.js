const express = require('express');
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database/database.sqlite');

const userInvestmentsRouter = express.Router({mergeParams: true});
module.exports = userInvestmentsRouter;

userInvestmentsRouter.param('investmentId', (req, res, next, id) => {
    db.get('SELECT * FROM Investment WHERE id = $id', {
        $id: id
    }, (err, investment) => {
        if (err) {
            next(err);
        } else if (investment) {
            req.investment = investment;

            db.get('SELECT * FROM User_Investment WHERE user_id = $user_id AND investment_id = $investment_id', {
                $user_id: req.user.id,
                $investment_id: investment.id
            }, (err, userInvestment) => {
                if (err) {
                    next(err);
                } else if (userInvestment) {
                    req.user_investment = userInvestment;
                }
                next();
            });
        } else {
            res.status(404).send("Investment not found");
        }
    });
});

const validateInvestmentPurchase = (req, res, next) => {
    if (!req.body.purchase.price_paid) {
        return res.status(400).send();
    }

    if (!req.body.purchase.purchase_date) {
        req.body.purchase.purchase_date = new Date();
    }

    next();
};

/*
Get -> Read operations:
*/

userInvestmentsRouter.get('/', (req, res, next) => {
    db.all('SELECT * FROM User_Investment WHERE user_id = $userId', {
        $userId: req.user.id
    }, (err, investments) => {
        if (err) {
            next(err);
        } else {
            res.status(200).json(investments);
        }
    });
});

userInvestmentsRouter.get('/:investmentId', (req, res, next) => {
    res.status(200).send(req.user_investment);
});


/*
Post -> Create operations:
*/

userInvestmentsRouter.post('/:investmentId', validateInvestmentPurchase, (req, res, next) => {
    if (req.user_investment) {
        res.status(200).send(req.user_investment);
    } else {
        db.run('INSERT INTO User_Investment (user_id, investment_id, purchase_date, price_paid) VALUES ($user_id, $investment_id, $purchase_date, $price_paid)', {
            $user_id: req.user.id, 
            $investment_id: req.investment.id,
            $purchase_date: req.body.purchase.purchase_date,
            $price_paid: req.body.purchase.price_paid
        }, function(err) {
            if (err) {
                next(err);
            }
            db.get('SELECT * FROM User_Investment WHERE user_id = $user_id AND investment_id = $investment_id', {
                $user_id: req.user.id,
                $investment_id: req.investment.id
            }, (err, investment) => {
                if (!investment) {
                    return res.status(500).send();
                }
                res.status(201).send(investment);
            });
        });
    }
});

/*
Put -> Update operations:
*/

userInvestmentsRouter.put('/:investmentId', validateInvestmentPurchase, (req, res, next) => {
    db.run('UPDATE User_Investment SET user_id = $user_id WHERE user_id = $user_id AND investment_id = $investment_id', {
        $user_id: req.user.id, 
        $investment_id: req.investment.id,
        $purchase_date: req.body.purchase.purchase_date || req.user_investment.purchase_date,
        $price_paid: req.body.purchase.price_paid || req.user_investment.price_paid
    }, (err) => {
        if (err) {
            next(err);
        }
        db.get('SELECT * FROM User_Investment WHERE user_id = $user_id AND investment_id = $investment_id', {
            $user_id: req.user.id,
            $investment_id: req.investment.id
        }, (err, investment) => {
            if (!investment) {
                return res.status(500).send();
            }
            res.status(201).send(investment);
        });
    });
});

/*
Delete -> Delete operations:
*/

userInvestmentsRouter.delete('/:investmentId', (req, res, next) => {
    db.run('DELETE FROM User_Investment WHERE user_id = $user_id AND investment_id = $investment_id', {
        $user_id: req.user.id, 
        $investment_id: req.investment.id
    }, (err) => {
        if (err) {
            next(err);
        }
        return res.status(202).send();
    });
});
