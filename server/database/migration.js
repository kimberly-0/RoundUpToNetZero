const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./database.sqlite');

/*
Create User, Company, Transactions, Investment, Payment, User_Investment and User_Company tables
*/
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS User (
        id INTEGER PRIMARY KEY, 
        name TEXT NOT NULL, 
        email TEXT NOT NULL,
        password TEXT NOT NULL 
        )`, (error) => {
        if (error) console.log(error);
    });

    db.run(`CREATE TABLE IF NOT EXISTS Company (
        id INTEGER PRIMARY KEY, 
        name TEXT NOT NULL,
        registration_number TEXT, 
        industry TEXT,
        number_of_employees INTEGER 
        )`, (error) => {
        if (error) console.log(error);
    });

    db.run(`CREATE TABLE IF NOT EXISTS Payment (
        id INTEGER PRIMARY KEY, 
        user_id INTEGER NOT NULL,
        card_number INTEGER NOT NULL,
        type TEXT NOT NULL,
        monitored INTEGER NOT NULL,
        FOREIGN KEY (user_id) REFERENCES User(id)
        )`, (error) => {
        if (error) console.log(error);
    });

    db.run(`CREATE TABLE IF NOT EXISTS Transactions (
        id INTEGER PRIMARY KEY, 
        user_id INTEGER NOT NULL,
        payment_id INTEGER NOT NULL,
        company_id INTEGER NOT NULL,
        date DATE NOT NULL,
        description TEXT,
        amount INTEGER NOT NULL,
        rounded_amount INTEGER NOT NULL,
        fund_contribution INTEGER NOT NULL,
        FOREIGN KEY (user_id) REFERENCES User(id),
        FOREIGN KEY (payment_id) REFERENCES Payment(id),
        FOREIGN KEY (company_id) REFERENCES Company(id)
        )`, (error) => {
        if (error) console.log(error);
    });

    db.run(`CREATE TABLE IF NOT EXISTS Investment (
        id INTEGER PRIMARY KEY, 
        description TEXT NOT NULL,
        benefit TEXT,
        original_price INTEGER NOT NULL,
        discounted_price INTEGER NOT NULL,
        impact TEXT
        )`, (error) => {
        if (error) console.log(error);
    });

    db.run(`CREATE TABLE IF NOT EXISTS User_Investment (
        user_id INTEGER NOT NULL, 
        investment_id INTEGER NOT NULL,
        purchase_date DATE NOT NULL,
        price_paid INTEGER NOT NULL,
        FOREIGN KEY (user_id) REFERENCES User(id),
        FOREIGN KEY (investment_id) REFERENCES Investment(id)
        )`, (error) => {
        if (error) console.log(error);
    });

    db.run(`CREATE TABLE IF NOT EXISTS User_Company (
        user_id INTEGER NOT NULL, 
        company_id INTEGER NOT NULL,
        FOREIGN KEY (user_id) REFERENCES User(id),
        FOREIGN KEY (company_id) REFERENCES Company(id)
        )`, (error) => {
        if (error) console.log(error);
    });
});