import { makeRequest } from './makeRequest'

export function getUser({ userId }) {
    return makeRequest(`/users/${userId}`)
}
