/* TO DO: Implement real request to back end to get data */

export function getTransactions({ userId }) {
    // return makeRequest(`/users/${userId}/transactions`)
    
    const transactions = [
    // December 2021
    {
        id: 82,
        date: "02/12/2021",
        amount: 110.20,
        rounded: 120,
        contributed: 9.80,
        paymethod: "Visa ending in 2776",
        description: "Groceries"
    },
    {
        id: 81,
        date: "14/12/2021",
        amount: 41.80,
        rounded: 50,
        contributed: 8.20,
        paymethod: "Visa ending in 8845",
        description: "Transport"
    },
    {
        id: 80,
        date: "21/12/2021",
        amount: 72.50,
        rounded: 80,
        contributed: 7.50,
        paymethod: "Visa ending in 2776",
        description: "Post office"
    },
    {
        id: 79,
        date: "28/12/2021",
        amount: 24.40,
        rounded: 30,
        contributed: 5.60,
        paymethod: "Visa ending in 8845",
        description: "Coffee shop"
    },
    {
        id: 78,
        date: "06/12/2021",
        amount: 140.10,
        rounded: 150,
        contributed: 9.90,
        paymethod: "Visa ending in 2776",
        description: "Restaurant"
    },
    {
        id: 77,
        date: "13/12/2021",
        amount: 60.70,
        rounded: 70,
        contributed: 9.30,
        paymethod: "Visa ending in 8845",
        description: "Office supplies"
    },
    {
        id: 76,
        date: "25/12/2021",
        amount: 43.90,
        rounded: 50,
        contributed: 6.10,
        paymethod: "Visa ending in 2776",
        description: "Coffee shop"
    },
    {
        id: 75,
        date: "30/12/2021",
        amount: 98.75,
        rounded: 100,
        contributed: 1.25,
        paymethod: "Visa ending in 8845",
        description: "Transport"
    },
    // January 2022
    {
        id: 74,
        date: "02/01/2022",
        amount: 105.90,
        rounded: 110,
        contributed: 4.10,
        paymethod: "Visa ending in 2776",
        description: "Groceries"
    },
    {
        id: 73,
        date: "14/01/2022",
        amount: 39.80,
        rounded: 40,
        contributed: 0.20,
        paymethod: "Visa ending in 8845",
        description: "Transport"
    },
    {
        id: 72,
        date: "21/01/2022",
        amount: 68.50,
        rounded: 70,
        contributed: 1.50,
        paymethod: "Visa ending in 2776",
        description: "Post office"
    },
    {
        id: 71,
        date: "28/01/2022",
        amount: 22.40,
        rounded: 30,
        contributed: 7.60,
        paymethod: "Visa ending in 8845",
        description: "Coffee shop"
    },
    {
        id: 70,
        date: "06/01/2022",
        amount: 145.20,
        rounded: 150,
        contributed: 4.80,
        paymethod: "Visa ending in 2776",
        description: "Restaurant"
    },
    {
        id: 69,
        date: "13/01/2022",
        amount: 56.70,
        rounded: 60,
        contributed: 3.30,
        paymethod: "Visa ending in 8845",
        description: "Office supplies"
    },
    {
        id: 68,
        date: "25/01/2022",
        amount: 40.90,
        rounded: 50,
        contributed: 9.10,
        paymethod: "Visa ending in 2776",
        description: "Coffee shop"
    },
    {
        id: 67,
        date: "30/01/2022",
        amount: 92.75,
        rounded: 100,
        contributed: 7.25,
        paymethod: "Visa ending in 8845",
        description: "Transport"
    },
    // February 2022
    {
        id: 66,
        date: "03/02/2022",
        amount: 105.80,
        rounded: 110,
        contributed: 4.20,
        paymethod: "Visa ending in 2776",
        description: "Groceries"
    },
    {
        id: 65,
        date: "14/02/2022",
        amount: 35.90,
        rounded: 40,
        contributed: 4.10,
        paymethod: "Visa ending in 8845",
        description: "Transport"
    },
    {
        id: 64,
        date: "21/02/2022",
        amount: 68.50,
        rounded: 70,
        contributed: 1.50,
        paymethod: "Visa ending in 2776",
        description: "Post office"
    },
    {
        id: 63,
        date: "28/02/2022",
        amount: 23.40,
        rounded: 30,
        contributed: 6.60,
        paymethod: "Visa ending in 8845",
        description: "Coffee shop"
    },
    {
        id: 62,
        date: "06/02/2022",
        amount: 145.20,
        rounded: 150,
        contributed: 4.80,
        paymethod: "Visa ending in 2776",
        description: "Restaurant"
    },
    {
        id: 61,
        date: "13/02/2022",
        amount: 56.70,
        rounded: 60,
        contributed: 3.30,
        paymethod: "Visa ending in 8845",
        description: "Office supplies"
    },
    {
        id: 60,
        date: "25/02/2022",
        amount: 40.90,
        rounded: 50,
        contributed: 9.10,
        paymethod: "Visa ending in 2776",
        description: "Coffee shop"
    },
    {
        id: 59,
        date: "30/02/2022",
        amount: 97.75,
        rounded: 100,
        contributed: 2.25,
        paymethod: "Visa ending in 8845",
        description: "Transport"
    },
    {
        id: 58,
        date: "16/02/2022",
        amount: 650.00,
        rounded: 700,
        contributed: 50.00,
        paymethod: "Visa ending in 2776",
        description: "Energy-Efficient Appliances"
    },
    {
        id: 57,
        date: "22/02/2022",
        amount: 480.50,
        rounded: 500,
        contributed: 19.50,
        paymethod: "Visa ending in 8845",
        description: "Renewable Energy System"
    },
    // March 2022
    {
        id: 56,
        date: "02/03/2022",
        amount: 115.90,
        rounded: 120,
        contributed: 4.10,
        paymethod: "Visa ending in 2776",
        description: "Groceries"
    },
    {
        id: 55,
        date: "14/03/2022",
        amount: 37.80,
        rounded: 40,
        contributed: 2.20,
        paymethod: "Visa ending in 8845",
        description: "Transport"
    },
    {
        id: 54,
        date: "21/03/2022",
        amount: 68.50,
        rounded: 70,
        contributed: 1.50,
        paymethod: "Visa ending in 2776",
        description: "Post office"
    },
    {
        id: 53,
        date: "28/03/2022",
        amount: 24.40,
        rounded: 30,
        contributed: 5.60,
        paymethod: "Visa ending in 8845",
        description: "Coffee shop"
    },
    {
        id: 52,
        date: "06/03/2022",
        amount: 145.20,
        rounded: 150,
        contributed: 4.80,
        paymethod: "Visa ending in 2776",
        description: "Restaurant"
    },
    {
        id: 51,
        date: "13/03/2022",
        amount: 56.70,
        rounded: 60,
        contributed: 3.30,
        paymethod: "Visa ending in 8845",
        description: "Office supplies"
    },
    {
        id: 50,
        date: "25/03/2022",
        amount: 40.90,
        rounded: 50,
        contributed: 9.10,
        paymethod: "Visa ending in 2776",
        description: "Coffee shop"
    },
    {
        id: 49,
        date: "30/03/2022",
        amount: 92.75,
        rounded: 100,
        contributed: 7.25,
        paymethod: "Visa ending in 8845",
        description: "Transport"
    },

    // April 2022
    {
        id: 48,
        date: "02/04/2022",
        amount: 95.60,
        rounded: 100,
        contributed: 4.40,
        paymethod: "Visa ending in 2776",
        description: "Groceries"
    },
    {
        id: 47,
        date: "14/04/2022",
        amount: 42.50,
        rounded: 50,
        contributed: 7.50,
        paymethod: "Visa ending in 8845",
        description: "Transport"
    },
    {
        id: 46,
        date: "21/04/2022",
        amount: 68.90,
        rounded: 70,
        contributed: 1.10,
        paymethod: "Visa ending in 2776",
        description: "Post office"
    },
    {
        id: 45,
        date: "29/04/2022",
        amount: 22.80,
        rounded: 30,
        contributed: 7.20,
        paymethod: "Visa ending in 8845",
        description: "Coffee shop"
    },
    {
        id: 44,
        date: "07/04/2022",
        amount: 120.30,
        rounded: 130,
        contributed: 9.70,
        paymethod: "Visa ending in 2776",
        description: "Restaurant"
    },
    {
        id: 43,
        date: "12/04/2022",
        amount: 65.40,
        rounded: 70,
        contributed: 4.60,
        paymethod: "Visa ending in 8845",
        description: "Office supplies"
    },
    {
        id: 42,
        date: "25/04/2022",
        amount: 43.20,
        rounded: 50,
        contributed: 6.80,
        paymethod: "Visa ending in 2776",
        description: "Coffee shop"
    },
    {
        id: 41,
        date: "30/04/2022",
        amount: 95.75,
        rounded: 100,
        contributed: 4.25,
        paymethod: "Visa ending in 8845",
        description: "Transport"
    },
    {
        id: 40,
        date: "17/04/2022",
        amount: 750.00,
        rounded: 800,
        contributed: 50.00,
        paymethod: "Visa ending in 2776",
        description: "Sustainable Equipment"
    },
    {
        id: 39,
        date: "22/04/2022",
        amount: 450.50,
        rounded: 500,
        contributed: 49.50,
        paymethod: "Visa ending in 8845",
        description: "Renewable Energy System"
    },

    // May 2022
    {
        id: 38,
        date: "02/05/2022",
        amount: 150.80,
        rounded: 160,
        contributed: 9.20,
        paymethod: "Visa ending in 2776",
        description: "Restaurant"
    },
    {
        id: 37,
        date: "17/05/2022",
        amount: 45.25,
        rounded: 50,
        contributed: 4.75,
        paymethod: "Visa ending in 8845",
        description: "Office supplies"
    },
    {
        id: 36,
        date: "24/05/2022",
        amount: 67.90,
        rounded: 70,
        contributed: 2.10,
        paymethod: "Visa ending in 2776",
        description: "Post office"
    },
    {
        id: 35,
        date: "30/05/2022",
        amount: 25.40,
        rounded: 30,
        contributed: 4.60,
        paymethod: "Visa ending in 8845",
        description: "Coffee shop"
    },

    // June 2022
    {
        id: 34,
        date: "03/06/2022",
        amount: 115.20,
        rounded: 120,
        contributed: 4.80,
        paymethod: "Visa ending in 2776",
        description: "Groceries"
    },
    {
        id: 33,
        date: "14/06/2022",
        amount: 49.50,
        rounded: 50,
        contributed: 0.50,
        paymethod: "Visa ending in 8845",
        description: "Coffee shop"
    },
    {
        id: 32,
        date: "27/06/2022",
        amount: 73.10,
        rounded: 80,
        contributed: 6.90,
        paymethod: "Visa ending in 2776",
        description: "Office supplies"
    },
    {
        id: 31,
        date: "29/06/2022",
        amount: 31.70,
        rounded: 40,
        contributed: 8.30,
        paymethod: "Visa ending in 8845",
        description: "Transport"
    },

    // July 2022
    {
        id: 30,
        date: "07/07/2022",
        amount: 88.20,
        rounded: 90,
        contributed: 1.80,
        paymethod: "Visa ending in 2776",
        description: "Office supplies"
    },
    {
        id: 29,
        date: "15/07/2022",
        amount: 49.80,
        rounded: 50,
        contributed: 0.20,
        paymethod: "Visa ending in 8845",
        description: "Coffee shop"
    },

    // August 2022
    {
        id: 28,
        date: "02/08/2022",
        amount: 70.25,
        rounded: 80,
        contributed: 9.75,
        paymethod: "Visa ending in 2776",
        description: "Restaurant"
    },
    {
        id: 27,
        date: "22/08/2022",
        amount: 150.00,
        rounded: 160,
        contributed: 10.00,
        paymethod: "Visa ending in 8845",
        description: "Groceries"
    },

    // September 2022
    {
        id: 26,
        date: "05/09/2022",
        amount: 112.50,
        rounded: 120,
        contributed: 7.50,
        paymethod: "Visa ending in 2776",
        description: "Office supplies"
    },
    {
        id: 25,
        date: "18/09/2022",
        amount: 18.90,
        rounded: 20,
        contributed: 1.10,
        paymethod: "Visa ending in 8845",
        description: "Post office"
    },

    // October 2022
    {
        id: 24,
        date: "10/10/2022",
        amount: 215.30,
        rounded: 220,
        contributed: 4.70,
        paymethod: "Visa ending in 2776",
        description: "Stock"
    },
    {
        id: 23,
        date: "28/10/2022",
        amount: 45.75,
        rounded: 50,
        contributed: 4.25,
        paymethod: "Visa ending in 8845",
        description: "Office supplies"
    },

    // November 2022
    {
        id: 22,
        date: "05/11/2022",
        amount: 92.60,
        rounded: 100,
        contributed: 7.40,
        paymethod: "Visa ending in 2776",
        description: "Restaurant"
    },
    {
        id: 21,
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
        id: 19,
        date: "30/12/2022",
        amount: 65.25,
        rounded: 70,
        contributed: 4.75,
        paymethod: "Visa ending in 8845",
        description: "Office supplies"
    },

    // January 2023
    {
        id: 18,
        date: "05/01/2023",
        amount: 96.80,
        rounded: 100,
        contributed: 3.20,
        paymethod: "Visa ending in 2776",
        description: "Post office"
    },
    {
        id: 17,
        date: "17/01/2023",
        amount: 28.90,
        rounded: 30,
        contributed: 1.10,
        paymethod: "Visa ending in 8845",
        description: "Coffee shop"
    },

    // February 2023
    {
        id: 16,
        date: "08/02/2023",
        amount: 180.40,
        rounded: 190,
        contributed: 9.60,
        paymethod: "Visa ending in 2776",
        description: "Stock"
    },
    {
        id: 15,
        date: "24/02/2023",
        amount: 54.75,
        rounded: 60,
        contributed: 5.25,
        paymethod: "Visa ending in 8845",
        description: "Office supplies"
    },

    // March 2023
    {
        id: 14,
        date: "15/03/2023",
        amount: 112.00,
        rounded: 120,
        contributed: 8.00,
        paymethod: "Visa ending in 2776",
        description: "Restaurant"
    },
    {
        id: 13,
        date: "28/03/2023",
        amount: 30.20,
        rounded: 40,
        contributed: 9.80,
        paymethod: "Visa ending in 8845",
        description: "Office supplies"
    },

    // April 2023
    {
        id: 12,
        date: "06/04/2023",
        amount: 85.50,
        rounded: 90,
        contributed: 4.50,
        paymethod: "Visa ending in 2776",
        description: "Post office"
    },
    {
        id: 11,
        date: "22/04/2023",
        amount: 52.90,
        rounded: 60,
        contributed: 7.10,
        paymethod: "Visa ending in 8845",
        description: "Transport"
    },

    // May 2023
    {
        id: 10,
        date: "11/05/2023",
        amount: 210.00,
        rounded: 220,
        contributed: 10.00,
        paymethod: "Visa ending in 2776",
        description: "Groceries"
    },

    // June 2023
    {
        id: 9,
        date: "29/06/2023",
        amount: 23.12,
        rounded: 30,
        contributed: 6.88,
        paymethod: "Visa ending in 8845",
        description: "Mobile"
    }, {
        id: 8,
        date: "22/06/2023",
        amount: 62.44,
        rounded: 70,
        contributed: 7.56,
        paymethod: "Visa ending in 8845",
        description: "Transport"
    }, {
        id: 7,
        date: "20/06/2023",
        amount: 98.05,
        rounded: 100,
        contributed:1.95,
        paymethod: "Visa ending in 2776",
        description: "Office supplies"
    }, {
        id: 6,
        date: "15/06/2023",
        amount: 36.85,
        rounded: 40,
        contributed: 3.15,
        paymethod: "Visa ending in 8845",
        description: "Gas station"
    }, 

    // July 2023
    {
        id: 5,
        date: "19/07/2023",
        amount: 123.45,
        rounded: 130,
        contributed: 6.55,
        paymethod: "Visa ending in 2776",
        description: "Office supplies"
    }, {
        id: 4,
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
        id: 2,
        date: "04/07/2023",
        amount: 58.93,
        rounded: 60,
        contributed: 1.07,
        paymethod: "Visa ending in 2776",
        description: "Office supplies"
    }, {
        id: 1,
        date: "02/07/2023",
        amount: 502.11,
        rounded: 510,
        contributed: 7.89,
        paymethod: "Visa ending in 2776",
        description: "Stock"
    }];

    return Promise.resolve(transactions).then((value) => {
        return value
    });
}

export function getTotalNZFundContributions({ userId }) {
    return getTransactions({ userId }).then(transactions => {
        if (transactions) {
            let totalContribution = 0;
            transactions.forEach(transaction => {
                totalContribution += transaction.contributed;
            })
            return totalContribution;
        }
        return 0;
    }).catch(error => {
        console.log(error);
        return 0;
    });
}