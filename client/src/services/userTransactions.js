
/* TO DO: Implement real request to back end to get data */

export function getTransactions({ userId }) {
    // return makeRequest(`/users/${userId}/transactions`)
    
    const transactions = [
    // July 2023
    {
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
    }, 

    // June 2023
    {
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
    },

    // July 2022
    {
        id: 10,
        date: "07/07/2022",
        amount: 88.20,
        rounded: 90,
        contributed: 1.80,
        paymethod: "Visa ending in 2776",
        description: "Office supplies"
    },
    {
        id: 11,
        date: "15/07/2022",
        amount: 49.80,
        rounded: 50,
        contributed: 0.20,
        paymethod: "Visa ending in 8845",
        description: "Coffee shop"
    },

    // August 2022
    {
        id: 12,
        date: "02/08/2022",
        amount: 70.25,
        rounded: 80,
        contributed: 9.75,
        paymethod: "Visa ending in 2776",
        description: "Restaurant"
    },
    {
        id: 13,
        date: "22/08/2022",
        amount: 150.00,
        rounded: 160,
        contributed: 10.00,
        paymethod: "Visa ending in 8845",
        description: "Groceries"
    },

    // September 2022
    {
        id: 14,
        date: "05/09/2022",
        amount: 112.50,
        rounded: 120,
        contributed: 7.50,
        paymethod: "Visa ending in 2776",
        description: "Office supplies"
    },
    {
        id: 15,
        date: "18/09/2022",
        amount: 18.90,
        rounded: 20,
        contributed: 1.10,
        paymethod: "Visa ending in 8845",
        description: "Post office"
    },

    // October 2022
    {
        id: 16,
        date: "10/10/2022",
        amount: 215.30,
        rounded: 220,
        contributed: 4.70,
        paymethod: "Visa ending in 2776",
        description: "Stock"
    },
    {
        id: 17,
        date: "28/10/2022",
        amount: 45.75,
        rounded: 50,
        contributed: 4.25,
        paymethod: "Visa ending in 8845",
        description: "Office supplies"
    },

    // November 2022
    {
        id: 18,
        date: "05/11/2022",
        amount: 92.60,
        rounded: 100,
        contributed: 7.40,
        paymethod: "Visa ending in 2776",
        description: "Restaurant"
    },
    {
        id: 19,
        date: "21/11/2022",
        amount: 35.40,
        rounded: 40,
        contributed: 4.60,
        paymethod: "Visa ending in 8845",
        description: "Transport"
    },

    // December 2022
    {
        id: 20,
        date: "12/12/2022",
        amount: 120.00,
        rounded: 130,
        contributed: 10.00,
        paymethod: "Visa ending in 2776",
        description: "Groceries"
    },
    {
        id: 21,
        date: "30/12/2022",
        amount: 65.25,
        rounded: 70,
        contributed: 4.75,
        paymethod: "Visa ending in 8845",
        description: "Office supplies"
    },

    // January 2023
    {
        id: 22,
        date: "05/01/2023",
        amount: 96.80,
        rounded: 100,
        contributed: 3.20,
        paymethod: "Visa ending in 2776",
        description: "Post office"
    },
    {
        id: 23,
        date: "17/01/2023",
        amount: 28.90,
        rounded: 30,
        contributed: 1.10,
        paymethod: "Visa ending in 8845",
        description: "Coffee shop"
    },

    // February 2023
    {
        id: 24,
        date: "08/02/2023",
        amount: 180.40,
        rounded: 190,
        contributed: 9.60,
        paymethod: "Visa ending in 2776",
        description: "Stock"
    },
    {
        id: 25,
        date: "24/02/2023",
        amount: 54.75,
        rounded: 60,
        contributed: 5.25,
        paymethod: "Visa ending in 8845",
        description: "Office supplies"
    },

    // March 2023
    {
        id: 26,
        date: "15/03/2023",
        amount: 112.00,
        rounded: 120,
        contributed: 8.00,
        paymethod: "Visa ending in 2776",
        description: "Restaurant"
    },
    {
        id: 27,
        date: "28/03/2023",
        amount: 30.20,
        rounded: 40,
        contributed: 9.80,
        paymethod: "Visa ending in 8845",
        description: "Office supplies"
    },

    // April 2023
    {
        id: 28,
        date: "06/04/2023",
        amount: 85.50,
        rounded: 90,
        contributed: 4.50,
        paymethod: "Visa ending in 2776",
        description: "Post office"
    },
    {
        id: 29,
        date: "22/04/2023",
        amount: 52.90,
        rounded: 60,
        contributed: 7.10,
        paymethod: "Visa ending in 8845",
        description: "Transport"
    },

    // May 2023
    {
        id: 30,
        date: "11/05/2023",
        amount: 210.00,
        rounded: 220,
        contributed: 10.00,
        paymethod: "Visa ending in 2776",
        description: "Groceries"
    }];

    return Promise.resolve(transactions).then((value) => {
        return value
    });
}

