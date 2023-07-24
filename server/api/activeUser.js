const sqlite3 = require('sqlite3')
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database/database.sqlite')

const loggedInUserName = 'John Doe'; // Change name to log in with a different user

// fake user login before each request
async function onRequestHook (req, res, next) {  
    db.get(`SELECT * FROM User WHERE name = $name`, {
        $name: loggedInUserName
    }, (err, user) => {
        if (err) {
            console.log(err)
            next(err)
        } else {

            if (req.cookies.userId !== user.id) {
                req.cookies.userId = user.id
                res.clearCookie("userId")
                res.cookie("userId", user.id)
            }
            
            // console.log("req.cookies.userId : " + req.cookies.userId)
            // console.log("req.signedCookies : " + req.signedCookies.userId)
            // console.log(JSON.stringify(user))

            next()
        }
    })
}

module.exports = onRequestHook;