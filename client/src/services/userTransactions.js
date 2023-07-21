
/* TO DO: Implement real request to back end to get data */

export function getTransactions({ userId }) {
    // return makeRequest(`/users/${userId}/transactions`)
    
    const transactions = [{
        id: 1,
        date: "19/07/2023",
        amount: 123.45,
        rounded: 130,
        contributed: 6.55,
        paymethod: "Visa ending in 2776",
        description: "Office supplies"
    }, {
        id: 2,
        date: "18/07/2023",
        amount: 261.32,
        rounded: 270,
        contributed: 8.68,
        paymethod: "Visa ending in 8845",
        description: "Utilities"
    }, {
        id: 3,
        date: "13/07/2023",
        amount: 16.10,
        rounded: 20,
        contributed: 3.90,
        paymethod: "Visa ending in 8845",
        description: "Post office"
    }, {
        id: 4,
        date: "04/07/2023",
        amount: 58.93,
        rounded: 60,
        contributed: 1.07,
        paymethod: "Visa ending in 2776",
        description: "Office supplies"
    }, {
        id: 5,
        date: "02/07/2023",
        amount: 502.11,
        rounded: 510,
        contributed: 7.89,
        paymethod: "Visa ending in 2776",
        description: "Stock"
    }, {
        id: 6,
        date: "29/06/2023",
        amount: 23.12,
        rounded: 30,
        contributed: 6.88,
        paymethod: "Visa ending in 8845",
        description: "Mobile"
    }, {
        id: 7,
        date: "22/06/2023",
        amount: 62.44,
        rounded: 70,
        contributed: 7.56,
        paymethod: "Visa ending in 8845",
        description: "Transport"
    }, {
        id: 8,
        date: "20/06/2023",
        amount: 98.05,
        rounded: 100,
        contributed:1.95,
        paymethod: "Visa ending in 2776",
        description: "Office supplies"
    }, {
        id: 9,
        date: "15/06/2023",
        amount: 36.85,
        rounded: 40,
        contributed: 3.15,
        paymethod: "Visa ending in 8845",
        description: "Gas station"
    }];

    return Promise.resolve(transactions).then((value) => {
        return value
    });
}

