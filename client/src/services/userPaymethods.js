import { makeRequest } from './makeRequest'

export function getPaymethods({ userId }) {
    return makeRequest(`/users/${userId}/paymethods`)
}
