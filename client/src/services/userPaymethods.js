import { makeRequest } from './makeRequest'

export function getPaymethods({ userId }) {
    return makeRequest(`/users/${userId}/paymethods`)
}

export function getPaymethodById({ userId, paymethodId }) {
    return makeRequest(`/users/${userId}/paymethods/${paymethodId}`).catch(error => {
        console.log("Unable to retrieve payment method");
        return null;
    });
}

export function createPaymethod({ userId, paymethod }) {
    return makeRequest(`/users/${userId}/paymethods`, {
        method: "POST",
        data: { paymethod: paymethod },
    });
}

export function updatePaymethod({ userId, paymethodId, paymethod }) {    
    return makeRequest(`/users/${userId}/paymethods/${paymethodId}`, {
        method: "PUT",
        data: { paymethod: paymethod },
    });
}

export function deletePaymethod({ userId, paymethodId }) {    
    return makeRequest(`/users/${userId}/paymethods/${paymethodId}`, {
        method: "DELETE",
    });
}
