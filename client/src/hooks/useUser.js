import { useState } from 'react';

export function useUser() {

    const getUserId = () => {
        const userIdFromLocalStorage = localStorage.getItem('userId');
        return userIdFromLocalStorage;
    };

    const [userId, setUserId] = useState(getUserId());

    const saveUserId = userId => {
        localStorage.setItem('userId', userId);
        setUserId(userId);
    };

    return {
        setUserId: saveUserId,
        userId
    }
}