const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const loginRouter = express.Router();
module.exports = loginRouter;

loginRouter.post('/', (req, res) => {
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
        return res.status(401).json("Invalid credentials");
    }).catch(error => {
        console.log(error);
        return res.status(401).json("Invalid credentials");
    });
});