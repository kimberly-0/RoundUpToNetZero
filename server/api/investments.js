const express = require('express');
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database/database.sqlite');

const investmentsRouter = express.Router();
module.exports = investmentsRouter;

investmentsRouter.param('investmentId', (req, res, next, id) => {
    db.get('SELECT * FROM Investment WHERE id = $id', {
        $id: id
    }, (err, investment) => {
        if (err) {
            next(err);
        } else if (investment) {
            req.investment = investment;
            next();
        } else {
            res.status(404).send("Investment not found");
        }
    });
});

const validateInvestment = (req, res, next) => {
    const toCreateInvestment = req.body.investment;
    if (!toCreateInvestment.description || !toCreateInvestment.original_price || !toCreateInvestment.discounted_price) {
        return res.status(400).send();
    }
    next();
};

/*
Get -> Read operations:
*/

investmentsRouter.get('/', (req, res, next) => {
    db.all('SELECT * FROM Investment', (err, investments) => {
        if (err) {
            next(err);
        } else {
            res.status(200).json(investments);
        }
    });
});

investmentsRouter.get('/:investmentId', (req, res, next) => {
    res.status(200).send(req.investment);
});

/*
Post -> Create operations:
*/

investmentsRouter.post('/', validateInvestment, (req, res, next) => {
    const toCreateInvestment = req.body.investment;    
    db.run('INSERT INTO Investment (description, benefit, original_price, discounted_price, impact) VALUES ($description, $benefit, $original_price, $discounted_price, $impact)', {
        $description: toCreateInvestment.description,
        $benefit: toCreateInvestment.benefit || null,
        $original_price: toCreateInvestment.original_price,
        $discounted_price: toCreateInvestment.discounted_price,
        $impact: toCreateInvestment.impact || null
    }, function(err) {
        if (err) {
            next(err);
        }
        db.get('SELECT * FROM Investment WHERE id = $id', {
            $id: this.lastID
        }, (err, investment) => {
            if (!investment) {
                return res.status(500).send();
            }
            res.status(201).send(investment);
        });
    });
});

/*
Put -> Update operations:
*/

investmentsRouter.put('/:investmentId', (req, res, next) => {
    const newInvestment = req.body.investment;    
    db.run('UPDATE Investment SET description = $description, benefit = $benefit, original_price = $original_price, discounted_price = $discounted_price, impact = $impact WHERE id = $id', {
        $id: req.investment.id,
        $description: newInvestment.description || req.investment.description,
        $benefit: newInvestment.benefit || req.investment.benefit,
        $original_price: newInvestment.original_price || req.investment.original_price,
        $discounted_price: newInvestment.discounted_price || req.investment.discounted_price,
        $impact: newInvestment.impact || req.investment.impact
    }, (err) => {
        if (err) {
            next(err);
        }
        db.get('SELECT * FROM Investment WHERE id = $id', {
            $id: req.investment.id
        }, (err, investment) => {
            if (err) {
                next(err);
            } else if (!investment) {
                return res.status(500).send();
            }
            res.status(200).send(investment);
        });
    });
});

/*
Delete -> Delete operations:
*/

investmentsRouter.delete('/:investmentId', (req, res, next) => {
    db.run('DELETE FROM Investment WHERE id = $id', {
        $id: req.investment.id,
    }, (err) => {
        if (err) {
            next(err);
        }
        return res.status(202).send();
    });
});
