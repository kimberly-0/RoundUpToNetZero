import { makeRequest } from './makeRequest'

export function getUser({ userId }) {
    return makeRequest(`/users/${userId}`);
}

export function updateUser({ userId, user }) {
    return makeRequest(`/users/${userId}`, {
        method: "PUT",
        data: { user: user },
    });
}