import { makeRequest  } from './makeRequest';

export function getInvestments({ userId }) {
    return makeRequest(`/users/${userId}/investments`);
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