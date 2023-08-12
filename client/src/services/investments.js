import { makeRequest  } from './makeRequest';

export function getInvestmentProducts() {
    return makeRequest(`/investments`).catch(error => {
        console.log("Unable to retrieve investment products");
        return [];
    });
}

export function getInvestmentById({ investmentId }) {
    return makeRequest(`/investments/${investmentId}`).catch(error => {
        console.log("Unable to retrieve investment");
        return null;
    });
}