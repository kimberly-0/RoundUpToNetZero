const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./database.sqlite');

db.serialize(() => {

    /*
    Check if all tables exists
    */

    db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='User'", (error) => {
        if (error) throw new Error(error);
    });

    db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='Company'", (error) => {
        if (error) throw new Error(error);
    });

    db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='Payment'", (error) => {
        if (error) throw new Error(error);
    });

    db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='Transactions'", (error) => {
        if (error) throw new Error(error);
    });

    db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='Investment'", (error) => {
        if (error) throw new Error(error);
    });

    db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='User_Investment'", (error) => {
        if (error) throw new Error(error);
    });

    db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='User_Company'", (error) => {
        if (error) throw new Error(error);
    });

    /*
    Populate all tables
    */

    db.run(`INSERT INTO User (name, email, password) VALUES
            ('John Doe', 'john.doe@email.com', 'fakepassword'),
            ('Jane Doe', 'jane.doe@email.com', 'fakepassword');
        `, (error) => {
        if (error) throw new Error(error);
    });

    db.run(`INSERT INTO Company (name, registration_number, industry, number_of_employees) VALUES
        ('Green Inc', 'GI123456', 'finance', 25);
        `, (error) => {
            if (error) throw new Error(error);
    });

    db.run(`INSERT INTO Payment (user_id, card_number, type, monitored) VALUES
        (1, 2776, 'Visa', 1),
        (1, 8845, 'Visa', 1);
        `, (error) => {
            if (error) throw new Error(error);
    });

    db.run(`INSERT INTO Transactions (user_id, company_id, payment_id, date, description, amount, rounded_amount, fund_contribution) VALUES
        (1, 1, 1, '2021-12-02', 'Groceries', 11020, 12000, 980),
        (1, 1, 1, '2021-12-06', 'Restaurant', 14010, 15000, 990),
        (1, 1, 2, '2021-12-13', 'Office supplies', 6070, 7000, 930),
        (1, 1, 1, '2021-12-21', 'Post office', 7250, 8000, 750),
        (1, 1, 1, '2021-12-25', 'Coffee shop', 4390, 5000, 610),
        (1, 1, 2, '2021-12-28', 'Coffee shop', 2440, 3000, 560),
        (1, 1, 2, '2021-12-30', 'Transport', 4180, 5000, 820),
        (1, 1, 2, '2021-12-30', 'Transport', 9875, 10000, 125),
        (1, 1, 1, '2022-01-02', 'Groceries', 10590, 11000, 410),
        (1, 1, 1, '2022-01-06', 'Restaurant', 14520, 15000, 480),
        (1, 1, 2, '2022-01-13', 'Office supplies', 5670, 6000, 330),
        (1, 1, 2, '2022-01-14', 'Transport', 3980, 4000, 20),
        (1, 1, 1, '2022-01-21', 'Post office', 6850, 7000, 150),
        (1, 1, 1, '2022-01-25', 'Coffee shop', 4090, 5000, 910),
        (1, 1, 2, '2022-01-28', 'Coffee shop', 2240, 3000, 760),
        (1, 1, 2, '2022-01-30', 'Transport', 9275, 10000, 725),
        (1, 1, 1, '2022-02-03', 'Groceries', 10580, 11000, 420),
        (1, 1, 1, '2022-02-06', 'Restaurant', 14520, 15000, 480),
        (1, 1, 2, '2022-02-13', 'Office supplies', 5670, 6000, 330),
        (1, 1, 2, '2022-02-14', 'Transport', 3590, 4000, 410),
        (1, 1, 1, '2022-02-16', 'Energy-efficient appliances', 65000, 70000, 5000),
        (1, 1, 1, '2022-02-21', 'Post office', 6850, 7000, 150),
        (1, 1, 2, '2022-02-22', 'Renewable energy system', 48050, 50000, 1950),
        (1, 1, 1, '2022-02-25', 'Coffee shop', 4090, 5000, 910),
        (1, 1, 2, '2022-02-28', 'Coffee shop', 2340, 3000, 660),
        (1, 1, 2, '2022-02-30', 'Transport', 9775, 10000, 225),
        (1, 1, 1, '2022-03-02', 'Groceries', 11590, 12000, 410),
        (1, 1, 1, '2022-03-06', 'Restaurant', 14520, 15000, 480),
        (1, 1, 2, '2022-03-13', 'Office supplies', 5670, 6000, 330),
        (1, 1, 2, '2022-03-14', 'Transport', 3780, 4000, 220),
        (1, 1, 1, '2022-03-21', 'Post office', 6850, 7000, 150),
        (1, 1, 1, '2022-03-25', 'Coffee shop', 4090, 5000, 910),
        (1, 1, 2, '2022-03-28', 'Coffee shop', 2440, 3000, 560),
        (1, 1, 2, '2022-03-30', 'Transport', 9275, 10000, 725),
        (1, 1, 1, '2022-04-02', 'Groceries', 9560, 10000, 440),
        (1, 1, 1, '2022-04-07', 'Restaurant', 12030, 13000, 970),
        (1, 1, 2, '2022-04-12', 'Office supplies', 6540, 7000, 460),
        (1, 1, 2, '2022-04-14', 'Transport', 4250, 5000, 750),
        (1, 1, 1, '2022-04-17', 'Sustainable equipment', 75000, 80000, 5000),
        (1, 1, 1, '2022-04-21', 'Post office', 6890, 7000, 110),
        (1, 1, 2, '2022-04-22', 'Renewable energy system', 45050, 50000, 4950),
        (1, 1, 1, '2022-04-25', 'Coffee shop', 4320, 5000, 680),
        (1, 1, 2, '2022-04-29', 'Coffee shop', 2280, 3000, 720),
        (1, 1, 2, '2022-04-30', 'Transport', 9575, 10000, 425),
        (1, 1, 1, '2022-05-02', 'Restaurant', 15080, 16000, 920),
        (1, 1, 2, '2022-05-17', 'Office supplies', 4525, 5000, 475),
        (1, 1, 1, '2022-05-24', 'Post office', 6790, 7000, 210),
        (1, 1, 2, '2022-05-30', 'Coffee shop', 2540, 3000, 460),
        (1, 1, 1, '2022-06-03', 'Groceries', 11520, 12000, 480),
        (1, 1, 2, '2022-06-14', 'Coffee shop', 4950, 5000, 50),
        (1, 1, 1, '2022-06-27', 'Office supplies', 7310, 8000, 690),
        (1, 1, 2, '2022-06-29', 'Transport', 3170, 4000, 830),
        (1, 1, 1, '2022-07-07', 'Office supplies', 8820, 9000, 180),
        (1, 1, 2, '2022-07-15', 'Coffee shop', 4980, 5000, 20),
        (1, 1, 1, '2022-08-02', 'Restaurant', 7025, 8000, 975),
        (1, 1, 2, '2022-08-22', 'Groceries', 15000, 16000, 1000),
        (1, 1, 1, '2022-09-05', 'Office supplies', 11250, 12000, 750),
        (1, 1, 2, '2022-09-18', 'Post office', 1890, 2000, 110),
        (1, 1, 1, '2022-10-05', 'Stock', 21530, 22000, 470),
        (1, 1, 2, '2022-10-28', 'Office supplies', 4575, 5000, 425),
        (1, 1, 1, '2022-11-05', 'Restaurant', 9260, 10000, 740),
        (1, 1, 2, '2022-11-21', 'Transport', 3540, 4000, 460),
        (1, 1, 1, '2022-12-12', 'Groceries', 12000, 13000, 1000),
        (1, 1, 2, '2022-12-30', 'Office supplies', 6525, 7000, 475),
        (1, 1, 1, '2023-01-05', 'Post office', 9680, 10000, 320),
        (1, 1, 2, '2023-01-17', 'Coffee shop', 2890, 3000, 110),
        (1, 1, 1, '2023-02-08', 'Stock', 18040, 19000, 960),
        (1, 1, 2, '2023-02-24', 'Office supplies', 5475, 6000, 525),
        (1, 1, 1, '2023-03-15', 'Restaurant', 11200, 12000, 800),
        (1, 1, 2, '2023-03-28', 'Office supplies', 3020, 4000, 980),
        (1, 1, 1, '2023-04-06', 'Post office', 8550, 9000, 450),
        (1, 1, 2, '2023-04-22', 'Transport', 5290, 6000, 710),
        (1, 1, 1, '2023-05-11', 'Groceries', 21000, 22000, 1000),
        (1, 1, 2, '2023-06-15', 'Gas station', 3685, 4000, 315),
        (1, 1, 1, '2023-06-20', 'Office supplies', 9805, 10000, 195),
        (1, 1, 2, '2023-06-22', 'Transport', 6244, 7000, 756),
        (1, 1, 2, '2023-06-29', 'Mobile', 2313, 3000, 688),
        (1, 1, 1, '2023-07-02', 'Stock', 50211, 51000, 789),
        (1, 1, 1, '2023-07-04', 'Office supplies', 5893, 6000, 107),
        (1, 1, 2, '2023-07-13', 'Post office', 1610, 2000, 390),
        (1, 1, 2, '2023-07-18', 'Utilities', 26132, 27000, 868),
        (1, 1, 1, '2023-07-19', 'Office supplies', 12345, 13000, 655);
        `, (error) => {
            if (error) throw new Error(error);
    });

    db.run(`INSERT INTO Investment (description, benefit, original_price, discounted_price, impact) VALUES
        ('Smart thermostat', 'Reduce energy consumption', 13291, 11298, 'high'),
        ('Carbon neutral printer', 'Minimise carbon footprint', 51110, 45999, 'medium'),
        ('Plant a tree', 'Carbon offsetting', 1499, 1199, 'low'),
        ('Electric bicycle', 'Lower emissions', 130000, 97500, 'high'),
        ('Recycled coffee machine', 'Use recycled materials', 39723, 33765, 'low'),
        ('Smart plug', 'Reduce energy consumption', 3499, 3149, 'medium');
        `, (error) => {
            if (error) throw new Error(error);
    });

    db.run(`INSERT INTO User_Investment (user_id, investment_id, purchase_date, price_paid) VALUES
        (1, 5, '2023-03-23', 33765),
        (1, 6, '2023-04-29', 3149),
        (1, 3, '2023-05-08', 1199),
        (1, 1, '2023-07-02', 11298);
        `, (error) => {
            if (error) throw new Error(error);
    });

    db.run(`INSERT INTO User_Company (user_id, company_id) VALUES
        (1, 1);
        `, (error) => {
            if (error) throw new Error(error);
    });

});
