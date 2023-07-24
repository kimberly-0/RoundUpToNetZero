const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./database.sqlite');

/*
DELETE User, Company, Transactions, Investment, Payment, User_Investment and User_Company tables
*/
db.serialize(() => {
    db.run(`DROP TABLE IF EXISTS User`, (err) => {
        if (err) console.log(err);
    });
    db.run(`DROP TABLE IF EXISTS Company`, (err) => {
        if (err) console.log(err);
    });
    db.run(`DROP TABLE IF EXISTS Transactions`, (err) => {
        if (err) console.log(err);
    });
    db.run(`DROP TABLE IF EXISTS Investment`, (err) => {
        if (err) console.log(err);
    });
    db.run(`DROP TABLE IF EXISTS Payment`, (err) => {
        if (err) console.log(err);
    });
    db.run(`DROP TABLE IF EXISTS User_Investment`, (err) => {
        if (err) console.log(err);
    });
    db.run(`DROP TABLE IF EXISTS User_Company`, (err) => {
        if (err) console.log(err);
    });
});
