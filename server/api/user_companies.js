const express = require('express');
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database/database.sqlite');

const userCompaniesRouter = express.Router({mergeParams: true});
module.exports = userCompaniesRouter;

userCompaniesRouter.param('companyId', (req, res, next, id) => {
    db.get('SELECT * FROM Company WHERE id = $id', {
        $id: id
    }, (err, company) => {
        if (err) {
            next(err);
        } else if (company) {
            req.company = company;

            db.get('SELECT * FROM User_Company WHERE user_id = $user_id AND company_id = $company_id', {
                $user_id: req.user.id,
                $company_id: company.id
            }, (err, userCompany) => {
                if (err) {
                    next(err);
                } else if (userCompany) {
                    req.user_company = userCompany;
                }
                next();
            });
        } else {
            res.status(404).send("Company not found");
        }
    });
});

/*
Get -> Read operations:
*/

userCompaniesRouter.get('/', (req, res, next) => {
    db.all('SELECT * FROM User_Company WHERE user_id = $userId', {
        $userId: req.user.id
    }, (err, companies) => {
        if (err) {
            next(err);
        } else {
            res.status(200).json(companies);
        }
    });
});

userCompaniesRouter.get('/:companyId', (req, res, next) => {
    res.status(200).send(req.user_company);
});


/*
Post -> Create operations:
*/

userCompaniesRouter.post('/:companyId', (req, res, next) => {
    if (req.user_company) {
        res.status(200).send(req.user_company);
    } else {
        db.run('INSERT INTO User_Company (user_id, company_id) VALUES ($user_id, $company_id)', {
            $user_id: req.user.id, 
            $company_id: req.company.id
        }, function(err) {
            if (err) {
                next(err);
            }
            db.get('SELECT * FROM User_Company WHERE user_id = $user_id AND company_id = $company_id', {
                $user_id: req.user.id,
                $company_id: req.company.id
            }, (err, company) => {
                if (!company) {
                    return res.status(500).send();
                }
                res.status(201).send(company);
            });
        });
    }
});

/*
Delete -> Delete operations:
*/

userCompaniesRouter.delete('/:companyId', (req, res, next) => {
    db.run('DELETE FROM User_Company WHERE user_id = $user_id AND company_id = $company_id', {
        $user_id: req.user.id, 
        $company_id: req.company.id
    }, (err) => {
        if (err) {
            next(err);
        }
        return res.status(202).send();
    });
});
