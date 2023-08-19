const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const loginRouter = express.Router();
module.exports = loginRouter;

const validateLogin = (req, res, next) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).send("Please enter your email and password");
    }
    next();
};

loginRouter.post('/', validateLogin, (req, res) => {
    
    // TO DELETE !!!!!!!
    console.log("Req body: " + JSON.stringify(req.body));
    console.log("Email: " + req.body.email);
    console.log("Password: " + req.body.password);

    return prisma.user.findUniqueOrThrow({ 
        where: { email: req.body.email }, 
        select: {
            id: true,
            password: true,
        },
    }).then(user => {
        if (user.password === req.body.password) {
            return res.send({
                token: 'test123',
                userId: user.id,
            });
        };
        return res.status(401).send("Invalid credentials");
    }).catch(error => {
        console.log(error);
        return res.status(401).send("Invalid credentials");
    });
});