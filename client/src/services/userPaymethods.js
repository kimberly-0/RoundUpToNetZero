import { makeRequest } from './makeRequest'

export function getPaymethods({ userId }) {
    return makeRequest(`/users/${userId}/paymethods`)
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
