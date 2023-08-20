const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const paymethodsRouter = express.Router({mergeParams: true});
module.exports = paymethodsRouter;

const PAYMETHOD_SELECT_FIELDS = {
    id: true,
    cardNumber: true,
    type: true,
    monitored: true,
    userId: true,
}

paymethodsRouter.param('paymethodId', async (req, res, next, paymethodId) => {
    await prisma.paymethod.findUniqueOrThrow({ 
        where: { id: paymethodId },
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
});


/*
Get -> Read operations:
*/

paymethodsRouter.get('/', async (req, res) => {
    return await prisma.paymethod.findMany({ 
        where: { userId: req.params.userId },
        select: PAYMETHOD_SELECT_FIELDS,
    }).then(paymethods => {
        return res.status(200).json(paymethods);
    }).catch(error => {
        console.log(error);
        return res.status(400).send("Payment methods not found");
    });
});

paymethodsRouter.get('/:paymethodId', (req, res) => {
    res.status(200).send(req.paymethod);
});

/*
Post -> Create operations:
*/

const validatePaymethod = (req, res, next) => {
    const toCreatePaymethod = req.body.paymethod;
    if (!toCreatePaymethod.cardNumber || !toCreatePaymethod.type) {
        return res.status(400).send();
    }

    if (!toCreatePaymethod.monitored) {
        toCreatePaymethod.monitored = false;
    }

    next();
};

paymethodsRouter.post('/', validatePaymethod, async (req, res) => {
    const newPaymethod = req.body.paymethod;
    return await prisma.paymethod.create({
        data: {
            cardNumber: newPaymethod.cardNumber,
            type: newPaymethod.type,
            monitored: newPaymethod.monitored,
            userId: req.params.userId,
        },
        select: PAYMETHOD_SELECT_FIELDS
    }).then(paymethod => {
        return res.status(201).send(paymethod);
    }).catch(error => {
        console.log(error);
        return res.status(400).send("Unable to create payment method");
    });
});

/*
Put -> Update operations:
*/

paymethodsRouter.put('/:paymethodId', async (req, res) => {
    const newPaymethod = req.body.paymethod;
    return await prisma.paymethod.update({
        where: { id: req.paymethod.id },
        data: {
            cardNumber: newPaymethod.cardNumber || req.paymethod.cardNumber,
            type: newPaymethod.type || req.paymethod.type,
            monitored: {
                set: newPaymethod.monitored !== undefined ? newPaymethod.monitored : req.paymethod.monitored,
            },
            userId: req.params.userId,
        },
        select: PAYMETHOD_SELECT_FIELDS
    }).then(paymethod => {
        return res.status(201).send(paymethod);
    }).catch(error => {
        console.log(error);
        return res.status(400).send("Unable to update payment method");
    });
});

/*
Delete -> Delete operations:
*/

paymethodsRouter.delete('/:paymethodId', async (req, res) => {
    return await prisma.paymethod.delete({
        where: { id: req.paymethod.id },
        select: { id: true },
    }).then(paymethod => {
        return res.status(202).send(paymethod);
    }).catch(error => {
        console.log(error);
        return res.status(400).send("Unable to delete payment method");
    })
});
