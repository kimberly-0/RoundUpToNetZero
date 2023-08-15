const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const usersRouter = express.Router();
module.exports = usersRouter;

const USER_SELECT_FIELDS = {
    id: true,
    name: true,
    email: true,
    password: false,
    company: {
        select: {
            id: true,
            name: true,
            registrationNumber: true,
            industry: true,
            numberOfEmployees: true,
        },
    },
}

usersRouter.param('userId', async (req, res, next, userId) => {    
    await prisma.user.findUnique({ 
        where: { id: userId }, 
        select: {
            ...USER_SELECT_FIELDS,
            password: true,
            paymethods: {
                select: {
                    id: true,
                    cardNumber: true,
                    type: true,
                    monitored: true,
                },
            },
        },
    }).then(user => {
        req.user = user;
        next();
        return;
    }).catch(error => {
        console.log(error);
        return res.status(404).send("User not found");
    });
});

/*
Get -> Read operations:
*/

usersRouter.get('/', async (req, res) => {
    return await prisma.user.findMany({ 
        select: USER_SELECT_FIELDS,
    }).then(users => {
        return res.status(200).json(users);
    }).catch(error => {
        console.log(error);
        return res.status(400).send("Users not found");
    });
});

usersRouter.get('/:userId', (req, res) => {
    res.status(200).send(req.user);
});

/*
Post -> Create operations:
*/

const validateUser = (req, res, next) => {
    const toCreateUser = req.body.user;
    if (!toCreateUser.name || !toCreateUser.email || !toCreateUser.password) {
        return res.status(400).send();
    }
    if (!toCreateUser.companyId) {
        req.body.companyId = null;
    }
    next();
};

usersRouter.post('/', validateUser, async (req, res) => {
    const newUser = req.body.user;
    return await prisma.user.create({
        data: {
            name: newUser.name,
            email: newUser.email,
            password: newUser.password,
            companyId: newUser.companyId,
        },
        select: USER_SELECT_FIELDS,
    }).then(user => {
        return res.status(201).send(user);
    }).catch(error => {
        console.log(error);
        return res.status(400).send("Unable to create user");
    });
});

/*
Put -> Update operations:
*/

usersRouter.put('/:userId', async (req, res) => {
    const newUser = req.body.user;    
    return await prisma.user.update({
        where: { id: req.user.id },
        data: {
            name: newUser.name || req.user.name,
            email: newUser.email || req.user.email,
            password: newUser.password || req.user.password,
            companyId: newUser.companyId || req.user.companyId,
        },
        select: USER_SELECT_FIELDS,
    }).then(user => {
        return res.status(201).send(user);
    }).catch(error => {
        console.log(error)
        return res.status(400).send("Unable to update user");
    });
});

/*
Delete -> Delete operations:
*/

usersRouter.delete('/:userId', async (req, res) => {
    return await prisma.user.delete({
        where: { id: req.user.id },
        select: { id: true },
    }).then(user => {
        return res.status(202).send(user);
    }).catch(error => {
        console.log(error);
        return res.status(400).send("Unable to delete user");
    })
});
