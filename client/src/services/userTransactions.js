import { makeRequest  } from './makeRequest';

export function getTransactions({ userId }) {
    return makeRequest(`/users/${userId}/transactions`)
}

export function getTotalNZFundContributions({ userId }) {
    return getTransactions({ userId }).then(transactions => {
        if (transactions) {
            let totalContribution = 0;
            transactions.forEach(transaction => {
                totalContribution += transaction.fund_contribution;
            })
            return totalContribution;
        }
        return 0;
    }).catch(error => {
        console.log(error);
        return 0;
    });
}