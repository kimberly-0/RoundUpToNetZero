// const { PrismaClient } = require('@prisma/client')
// const prisma = new PrismaClient()

// const loggedInUserName = 'John Doe'; // Change name to log in with a different user

// // fake user login before each request
// async function onRequestHook (req, res, next) {
//     const CURRENT_USER_ID = (
//         await prisma.user.findFirst({ where: { name: loggedInUserName } }).then(user => {
//             return user.id
//         }).catch(error => {
//             console.log(error)
//             return
//         })
//     ) 

//     if (req.cookies.userId !== CURRENT_USER_ID) {
//         req.cookies.userId = CURRENT_USER_ID
//         res.clearCookie("userId")
//         res.cookie("userId", CURRENT_USER_ID)
//     }
    
//     // console.log("req.cookies.userId : " + req.cookies.userId)
//     // console.log("req.signedCookies : " + req.signedCookies.userId)

//     next()
// }

// module.exports = onRequestHook;