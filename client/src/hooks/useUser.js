import { useState } from 'react';
import { makeRequest } from "../services/makeRequest";

export function useUser() {

    // const [userId, setUserId] = useState();

    const getUserId = () => {
        const userIdFromLocalStorage = localStorage.getItem('userId');

        // Get userId using a request if there is no userId in local storage (local storage is not supported for cross-domain deployment)
        if (!userIdFromLocalStorage) {
            return makeRequest(`${process.env.REACT_APP_SERVER_URL}/login`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: 'john.doe@email.com', password: 'fakepassword' }),
            })
            .then(response => {
                if (response.status !== 200) throw new Error("Invalid credentials");
                return response.json();
            });
        }

        return userIdFromLocalStorage;
    };

    const [userId, setUserId] = useState(getUserId());

    const saveUserId = userId => {
        localStorage.setItem('userId', JSON.stringify(userId));
        setUserId(userId);
    };

    return {
        setUserId: saveUserId,
        userId
    }
}