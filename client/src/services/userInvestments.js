import { makeRequest  } from './makeRequest';

export function getPurchases({ userId }) {
    return makeRequest(`/users/${userId}/purchases`).catch(error => {
        console.log("Unable to retrieve purchases");
        return [];
    });
}

export function addPurchase({ userId, purchase }) {
    return makeRequest(`/users/${userId}/purchases`, {
        method: "POST",
        data: { purchase: purchase },
    });
}

export function getTotalInvested({ userId }) {
    return getPurchases({ userId }).then(purchases => {
        if (purchases) {
            let totalInvested = 0;
            purchases.forEach(purchase => {
                totalInvested += Number(purchase.pricePaid);
            })
            return totalInvested;
        }
        return 0;
    }).catch(error => {
        console.log(error);
        return 0;
    });
}