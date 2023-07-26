const express = require('express');
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database/database.sqlite');

const companiesRouter = express.Router();
module.exports = companiesRouter;

companiesRouter.param('companyId', (req, res, next, id) => {
    db.get('SELECT * FROM Company WHERE id = $id', {
        $id: id
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
});

const validateCompany = (req, res, next) => {
    if (!req.body.company.name) {
        return res.status(400).send();
    }
    next();
};

/*
Get -> Read operations:
*/

companiesRouter.get('/', (req, res, next) => {
    db.all('SELECT * FROM Company', (err, companies) => {
        if (err) {
            next(err);
        } else {
            res.status(200).json(companies);
        }
    });
});

companiesRouter.get('/:companyId', (req, res, next) => {
    res.status(200).send(req.company);
});

/*
Post -> Create operations:
*/

companiesRouter.post('/', validateCompany, (req, res, next) => {
    const toCreateCompany = req.body.company;    
    db.run('INSERT INTO Company (name, registration_number, industry, number_of_employees) VALUES ($name, $registration_number, $industry, $number_of_employees)', {
        $name: toCreateCompany.name, 
        $registration_number: toCreateCompany.registration_number || null, 
        $industry: toCreateCompany.industry || null,
        $number_of_employees: toCreateCompany.number_of_employees || null
    }, function(err) {
        if (err) {
            next(err);
        }
        db.get('SELECT * FROM Company WHERE id = $id', {
            $id: this.lastID
        }, (err, company) => {
            if (!company) {
                return res.status(500).send();
            }
            res.status(201).send(company);
        });
    });
});

/*
Put -> Update operations:
*/

companiesRouter.put('/:companyId', (req, res, next) => {
    const newCompany = req.body.company;    
    db.run('UPDATE Company SET name = $name, registration_number = $registration_number, industry = $industry, number_of_employees = $number_of_employees WHERE id = $id', {
        $id: req.company.id,
        $name: newCompany.name || req.company.name, 
        $registration_number: newCompany.registration_number || req.company.registration_number, 
        $industry: newCompany.industry || req.company.industry,
        $number_of_employees: newCompany.number_of_employees || req.company.number_of_employees
    }, (err) => {
        if (err) {
            next(err);
        }
        db.get('SELECT * FROM Company WHERE id = $id', {
            $id: req.company.id
        }, (err, company) => {
            if (err) {
                next(err);
            } else if (!company) {
                return res.status(500).send();
            }
            res.status(200).send(company);
        });
    });
});

/*
Delete -> Delete operations:
*/

companiesRouter.delete('/:companyId', (req, res, next) => {
    db.run('DELETE FROM Company WHERE id = $id', {
        $id: req.company.id,
    }, (err) => {
        if (err) {
            next(err);
        }
        return res.status(202).send();
    });
});
