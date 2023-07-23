
/* TO DO: Implement real request to back end to get data
{
    id: 2,
    date: "15/06/2023",
    description: "Electric bicycle",
    benefit: "Lower emissions",
    price: 975,
    impact: "high"
}, {
    id: 3,
    date: "24/05/2023",
    description: "Carbon neutral printer",
    benefit: "Minimise carbon footprint",
    price: 459.99,
    impact: "medium"
},
*/

export function getInvestments({ userId }) {
    // return makeRequest(`/users/${userId}/investments`)

    const investments = [{
        id: 1,
        date: "02/07/2023",
        description: "Smart thermostat",
        benefit: "Reduce energy consumption",
        price: 112.98,
        impact: "high"
    }, {
        id: 4,
        date: "08/05/2023",
        description: "Plant a tree",
        benefit: "Carbon offsetting",
        price: 11.99,
        impact: "low"
    }, {
        id: 5,
        date: "29/04/2023",
        description: "Smart plug",
        benefit: "Reduce energy consumption",
        price: 31.49,
        impact: "medium"
    }, {
        id: 6,
        date: "23/03/2023",
        description: "Recycled coffee machine",
        benefit: "Use recycled materials",
        price: 337.65,
        impact: "low"
    }];

    return Promise.resolve(investments).then((value) => {
        return value
    });
}

export function getTotalInvested({ userId }) {
    return getInvestments({ userId }).then(investments => {
        if (investments) {
            let totalInvested = 0;
            investments.forEach(investment => {
                totalInvested += investment.price;
            })
            return totalInvested;
        }
        return 0;
    }).catch(error => {
        console.log(error);
        return 0;
    });
}