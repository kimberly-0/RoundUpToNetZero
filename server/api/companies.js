const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const companiesRouter = express.Router();
module.exports = companiesRouter;

const COMPANY_SELECT_FIELDS = {
    id: true,
    name: true,
    registrationNumber: true,
    industry: true,
    numberOfEmployees: true,
}

companiesRouter.param('companyId', async (req, res, next, companyId) => {
    await prisma.company.findUniqueOrThrow({ 
        where: { id: companyId },
    })
    .then(company => {
        req.company = company;
        next();
        return;
    })
    .catch(error => {
        console.log(error);
        return res.status(404).send("Company not found");
    });
});

/*
Get -> Read operations:
*/

companiesRouter.get('/', async (req, res) => {
    return await prisma.company.findMany({ 
        select: COMPANY_SELECT_FIELDS,
    }).then(company => {
        return res.status(200).json(company);
    }).catch(error => {
        console.log(error);
        return res.status(400).send("Company not found");
    });
});

companiesRouter.get('/:companyId', (req, res, next) => {
    res.status(200).send(req.company);
});

/*
Post -> Create operations:
*/

const validateCompany = (req, res, next) => {
    if (!req.body.company.name) {
        return res.status(400).send("Missing information");
    }

    next();
};

companiesRouter.post('/', validateCompany, async (req, res) => {
    const newCompany = req.body.company;
    return await prisma.company.create({
        data: {
            name: newCompany.name,
            registrationNumber: newCompany.registrationNumber,
            industry: newCompany.industry,
            numberOfEmployees: newCompany.numberOfEmployees,
        },
        select: COMPANY_SELECT_FIELDS
    }).then(company => {
        return res.status(201).send(company);
    }).catch(error => {
        console.log(error);
        return res.status(400).send("Unable to create company");
    });
});

/*
Put -> Update operations:
*/

companiesRouter.put('/:companyId', validateCompany, async (req, res) => {
    const newCompany = req.body.company;
    return await prisma.company.update({
        where: { id: req.company.id },
        data: {
            name: newCompany.name || req.company.name,
            registrationNumber: newCompany.registrationNumber || req.company.registrationNumber,
            industry: newCompany.industry || req.company.industry,
            numberOfEmployees: newCompany.numberOfEmployees || req.company.numberOfEmployees,
        },
        select: COMPANY_SELECT_FIELDS
    }).then(company => {
        return res.status(201).send(company);
    }).catch(error => {
        console.log(error);
        return res.status(400).send("Unable to update company");
    });
});

/*
Delete -> Delete operations:
*/

companiesRouter.delete('/:companyId', async (req, res) => {
    return await prisma.company.delete({
        where: { id: req.company.id },
        select: { id: true },
    }).then(company => {
        return res.status(202).send(company);
    }).catch(error => {
        console.log(error);
        return res.status(400).send("Unable to delete company");
    })
});
