const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const investmentsRouter = express.Router();
module.exports = investmentsRouter;

const INVESTMENT_SELECT_FIELDS = {
    id: true,
    description: true,
    benefit: true,
    originalPrice: true,
    discountedPrice: true,
    impact: true,
}

investmentsRouter.param('investmentId', async (req, res, next, investmentId) => {
    await prisma.investment.findUniqueOrThrow({ 
        where: { id: investmentId },
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
});

/*
Get -> Read operations:
*/

investmentsRouter.get('/', async (req, res) => {
    return await prisma.investment.findMany({ 
        select: INVESTMENT_SELECT_FIELDS,
    }).then(investment => {
        return res.status(200).json(investment);
    }).catch(error => {
        console.log(error);
        return res.status(400).send("Investment not found");
    });
});

investmentsRouter.get('/:investmentId', (req, res, next) => {
    res.status(200).send(req.investment);
});

/*
Post -> Create operations:
*/

const validateInvestment = (req, res, next) => {
    const toCreateInvestment = req.body.investment;
    if (!toCreateInvestment.description || !toCreateInvestment.originalPrice || !toCreateInvestment.discountedPrice) {
        return res.status(400).send();
    }
    next();
};

investmentsRouter.post('/', validateInvestment, async (req, res) => {
    const newInvestment = req.body.investment;
    return await prisma.investment.create({
        data: {
            description: newInvestment.description,
            benefit: newInvestment.benefit,
            originalPrice: newInvestment.originalPrice,
            discountedPrice: newInvestment.discountedPrice,
            impact: newInvestment.impact,
        },
        select: INVESTMENT_SELECT_FIELDS
    }).then(investment => {
        return res.status(201).send(investment);
    }).catch(error => {
        console.log(error);
        return res.status(400).send("Unable to create investment");
    });
});

/*
Put -> Update operations:
*/

investmentsRouter.put('/:investmentId', validateInvestment, async (req, res) => {
    const newInvestment = req.body.investment;
    return await prisma.investment.update({
        where: { id: req.investment.id },
        data: {
            description: newInvestment.description || req.investment.description,
            benefit: newInvestment.benefit || req.investment.benefit,
            originalPrice: newInvestment.originalPrice || req.investment.originalPrice,
            discountedPrice: newInvestment.discountedPrice || req.investment.discountedPrice,
            impact: newInvestment.impact || req.investment.impact,
        },
        select: INVESTMENT_SELECT_FIELDS
    }).then(investment => {
        return res.status(201).send(investment);
    }).catch(error => {
        console.log(error);
        return res.status(400).send("Unable to update investment");
    });
});

/*
Delete -> Delete operations:
*/

investmentsRouter.delete('/:investmentId', async (req, res) => {
    return await prisma.investment.delete({
        where: { id: req.investment.id },
        select: { id: true },
    }).then(investment => {
        return res.status(202).send(investment);
    }).catch(error => {
        console.log(error);
        return res.status(400).send("Unable to delete investment");
    })
});
