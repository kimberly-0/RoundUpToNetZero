const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const purchasedInvestmentsRouter = express.Router({mergeParams: true});
module.exports = purchasedInvestmentsRouter;

const PURCHASES_SELECT_FIELDS = {
    id: true,
    date: true,
    pricePaid: true,
    userId: true,
    investment: {
        select: {
            id: true,
            description: true,
            benefit: true,
            impact: true,
        },
    },
}

purchasedInvestmentsRouter.param('purchaseId', async (req, res, next, purchaseId) => {
    await prisma.purchase.findUniqueOrThrow({ 
        where: { id: purchaseId },
    })
    .then(purchase => {
        req.purchase = purchase;
        next();
        return;
    })
    .catch(error => {
        console.log(error);
        return res.status(404).send("Purchase not found");
    });
});


/*
Get -> Read operations:
*/

purchasedInvestmentsRouter.get('/', async (req, res) => {
    return await prisma.purchase.findMany({ 
        select: PURCHASES_SELECT_FIELDS,
    }).then(purchases => {
        return res.status(200).json(purchases);
    }).catch(error => {
        console.log(error);
        return res.status(400).send("Purchases not found");
    });
});

purchasedInvestmentsRouter.get('/:purchaseId', (req, res) => {
    res.status(200).send(req.purchase);
});

/*
Post -> Create operations:
*/

const validatePurchase = (req, res, next) => {
    if (!req.body.purchase.pricePaid) {
        return res.status(400).send();
    }

    if (!req.body.purchase.date) {
        req.body.purchase.date = new Date();
    }

    next();
};

const validateInvestment = (req, res, next) => {
    prisma.investment.findUniqueOrThrow({ 
        where: { id: req.body.purchase.investmentId },
    })
    .then(investment => {
        req.investment = investment;
        next();
        return;
    })
    .catch(error => {
        console.log(error);
        return res.status(404).send("Investment not found");
    });
};

purchasedInvestmentsRouter.post('/', validatePurchase, validateInvestment, async (req, res) => {
    const newPurchase = req.body.purchase;
    return await prisma.purchase.create({
        data: {
            date: newPurchase.date,
            pricePaid: newPurchase.pricePaid,
            userId: req.user.id,
            investmentId: req.investment.id,
        },
        select: PURCHASES_SELECT_FIELDS
    }).then(purchase => {
        return res.status(201).send(purchase);
    }).catch(error => {
        console.log(error);
        return res.status(400).send("Unable to create purchase");
    });
});

/*
Put -> Update operations:
*/

purchasedInvestmentsRouter.put('/:purchaseId', async (req, res) => {
    const newPurchase = req.body.purchase;
    return await prisma.purchase.update({
        where: { id: req.purchase.id },
        data: {
            date: newPurchase.date || req.purchase.date,
            pricePaid: newPurchase.pricePaid || req.purchase.pricePaid,
            userId: req.user.id || req.purchase.userId,
            investmentId: newPurchase.investmentId || req.purchase.investmentId,
        },
        select: PURCHASES_SELECT_FIELDS
    }).then(purchase => {
        return res.status(201).send(purchase);
    }).catch(error => {
        console.log(error);
        return res.status(400).send("Unable to update purchase");
    });
});

/*
Delete -> Delete operations:
*/

purchasedInvestmentsRouter.delete('/:purchaseId', async (req, res) => {
    return await prisma.purchase.delete({
        where: { id: req.purchase.id },
        select: { id: true },
    }).then(purchase => {
        return res.status(202).send(purchase);
    }).catch(error => {
        console.log(error);
        return res.status(400).send("Unable to delete purchase");
    })
});
