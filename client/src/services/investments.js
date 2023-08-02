import { makeRequest  } from './makeRequest';

export function getInvestmentProducts() {
    return makeRequest(`/investments`).catch(error => {
        console.log("Unable to retrieve investment products");
        return [];
    });
}
