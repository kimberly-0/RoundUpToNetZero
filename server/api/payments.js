const express = require('express');
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database/database.sqlite');

const paymentsRouter = express.Router({mergeParams: true});
module.exports = paymentsRouter;

paymentsRouter.param('paymentId', (req, res, next, id) => {
    db.get('SELECT * FROM Payment WHERE id = $paymentId AND user_id = $userId', {
        $paymentId: id,
        $userId: req.user.id
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
});

const validatePayment = (req, res, next) => {
    const toCreatePayment = req.body.payment;
    if (!toCreatePayment.card_number || !toCreatePayment.type) {
        return res.status(400).send();
    }

    // If monitoring value is missing, set monitored to false
    if (!toCreatePayment.monitored) {
        toCreatePayment.monitored = 0;
    }
    
    next();
};

/*
Get -> Read operations:
*/

paymentsRouter.get('/', (req, res, next) => {
    db.all('SELECT * FROM Payment WHERE user_id = $userId', {
        $userId: req.user.id
    }, (err, payments) => {
        if (err) {
            next(err);
        } else {
            res.status(200).json(payments);
        }
    });
});

paymentsRouter.get('/:paymentId', (req, res, next) => {
    res.status(200).send(req.payment);
});


/*
Post -> Create operations:
*/

paymentsRouter.post('/', validatePayment, (req, res, next) => {
    const toCreatePayment = req.body.payment;    
    db.run('INSERT INTO Payment (user_id, card_number, type, monitored) VALUES ($user_id, $card_number, $type, $monitored)', {
        $user_id: req.user.id, 
        $card_number: toCreatePayment.card_number, 
        $type: toCreatePayment.type, 
        $monitored: toCreatePayment.monitored
    }, function(err) {
        if (err) {
            next(err);
        }
        db.get('SELECT * FROM Payment WHERE id = $id', {
            $id: this.lastID
        }, (err, payment) => {
            if (!payment) {
                return res.status(500).send();
            }
            res.status(201).send(payment);
        });
    });
});

/*
Put -> Update operations:
*/

paymentsRouter.put('/:paymentId', validatePayment, (req, res, next) => {
    const newPayment = req.body.payment;    
    db.run('UPDATE Payment SET user_id = $user_id, card_number = $card_number, type = $type, monitored = $monitored WHERE id = $id', {
        $id: req.payment.id,
        $user_id: req.user.id, 
        $card_number: newPayment.card_number || req.payment.card_number, 
        $type: newPayment.type || req.payment.type, 
        $monitored: newPayment.monitored || req.payment.monitored
    }, (err) => {
        if (err) {
            next(err);
        }
        db.get('SELECT * FROM Payment WHERE id = $id', {
            $id: req.payment.id
        }, (err, payment) => {
            if (err) {
                next(err);
            } else if (!payment) {
                return res.status(500).send();
            }
            res.status(200).send(payment);
        });
    });
});

/*
Delete -> Delete operations:
*/

paymentsRouter.delete('/:paymentId', (req, res, next) => {
    db.run('DELETE FROM Payment WHERE id = $id', {
        $id: req.payment.id,
    }, (err) => {
        if (err) {
            next(err);
        }
        return res.status(202).send();
    });
});
