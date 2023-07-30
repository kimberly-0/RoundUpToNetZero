import { makeRequest  } from './makeRequest';

export function getPurchases({ userId }) {
    return makeRequest(`/users/${userId}/purchases`);
}

export function getTotalInvested({ userId }) {
    return getPurchases({ userId }).then(purchases => {
        if (purchases) {
            let totalInvested = 0;
            purchases.forEach(purchase => {
                totalInvested += purchase.price;
            })
            return totalInvested;
        }
        return 0;
    }).catch(error => {
        console.log(error);
        return 0;
    });
}